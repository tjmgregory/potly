package main

import (
	"log"
	"sync"

	"github.com/juju/errors"
	"theodo.red/creditcompanion/packages/clients/clirepo"
	"theodo.red/creditcompanion/packages/credtrack"
	"theodo.red/creditcompanion/packages/database/tdynamo"
	"theodo.red/creditcompanion/packages/logging"
	"theodo.red/creditcompanion/packages/money"
	"theodo.red/creditcompanion/packages/pot"
)

type TransactionProcessor interface {
	Process(transaction credtrack.CreditTransaction) error
}

type ParallelTransactionProcessor struct {
	logger             logging.Logger
	clientRepo         clirepo.ClientRepository
	potTransferService pot.PotTransferService
}

func (p *ParallelTransactionProcessor) Process(transaction credtrack.CreditTransaction) error {
	fatalErrors := make(chan error)
	wgDone := make(chan bool)

	var wg sync.WaitGroup
	wg.Add(len(transaction.LinkedClients))

	for clientId, proportion := range transaction.LinkedClients {
		go func(clientId string, proportion float32) {
			defer wg.Done()
			err := p.processTransactionForClient(transaction, clientId, proportion)
			if err != nil {
				fatalErrors <- err
			}
		}(clientId, proportion)
	}

	go func() {
		wg.Wait()
		close(wgDone)
	}()

	select {
	case <-wgDone:
		return nil
	case err := <-fatalErrors:
		close(fatalErrors)
		return err
	}
}

func (p *ParallelTransactionProcessor) processTransactionForClient(transaction credtrack.CreditTransaction, clientId string, proportion float32) error {
	log.Printf("processTransactionForClient transaction: %v, clientId: %v, proportion: %v", transaction, clientId, proportion)

	transferValue, err := transaction.Total.MultFloat(proportion)
	if err != nil {
		return errors.Annotatef(err, "Failed to calculate transfer value. transaction total: %v, proportion: %v", transaction.Total, proportion)
	}
	log.Printf("Calculated value to transfer: %v", transferValue)

	client, err := p.clientRepo.Get(clientId)
	if err != nil {
		return errors.Annotatef(err, "Failed to get client %v for transaction %v", clientId, transaction.Id)
	}
	log.Printf("Retrieved client for transfer: %v", client)

	transferErrors := make(chan error)
	transfersDone := make(chan bool)

	var wg sync.WaitGroup
	wg.Add(len(client.Pots))

	for potId, potProportion := range client.Pots {
		go func(potId string, potProportion float32) {
			defer wg.Done()

			potTransferValue, err := transferValue.MultFloat(potProportion)
			if err != nil {
				transferErrors <- errors.Annotatef(err, "Failed to calculate pot split for transfer. potId: %v potProportion: %v total transfer value: %v", potId, potProportion, transferValue)
				return
			}

			idempotencyKey := clientId + potId + transaction.Id
			log.Printf("Idempotency key: %v", idempotencyKey)

			if err := p.potTransferService.TransferCash(potId, clientId, money.CREDIT, *potTransferValue, idempotencyKey); err != nil {
				transferErrors <- errors.Annotatef(err, "Failed to process transfer for pot %v, potTransferValue: %v, clientId: %v", potId, potTransferValue, clientId)
			}
		}(potId, potProportion)
	}

	go func() {
		wg.Wait()
		close(transfersDone)
	}()

	select {
	case <-transfersDone:
		close(transferErrors)
		return nil
	case err := <-transferErrors:
		p.logger.Error("Failure during transfers.\nerror: %v", err)
	}

	return nil
}

func NewParallelTransactionProcessor(db tdynamo.DynamoDbInterface) TransactionProcessor {
	processor := new(ParallelTransactionProcessor)
	processor.clientRepo = clirepo.NewDynamoClientRepository(db)
	processor.logger = logging.NewConsoleLogger()
	processor.potTransferService = pot.NewPotTransferService(db)

	return processor
}
