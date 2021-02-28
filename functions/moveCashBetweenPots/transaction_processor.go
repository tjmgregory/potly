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
	var waitGroup sync.WaitGroup

	for clientId, percentage := range transaction.LinkedClients {
		waitGroup.Add(1)
		go p.processTransactionForClient(&waitGroup, transaction, clientId, percentage)
	}

	waitGroup.Wait()

	// TODO: Check each process didn't fail

	return nil
}

func (p *ParallelTransactionProcessor) processTransactionForClient(wg *sync.WaitGroup, transaction credtrack.CreditTransaction, clientId string, percentage float32) error {
	defer wg.Done()
	log.Printf("processTransactionForClient transaction: %v, clientId: %v, percentage: %v", transaction, clientId, percentage)

	transferValue, err := transaction.Total.Mult(money.MonetaryAmount{Value: percentage, Currency: transaction.Total.Currency})
	if err != nil {
		return errors.Annotatef(err, "Failed to calculate transfer value. transaction total: %v, percentage: %v", transaction.Total, percentage)
	}
	log.Printf("Calculated value to transfer: %v", transferValue)

	client, err := p.clientRepo.Get(clientId)
	if err != nil {
		return errors.Annotatef(err, "Failed to get client %v for transaction %v", clientId, transaction.Id)
	}
	log.Printf("Retrieved client for transfer: %v", client)

	var transfersWG sync.WaitGroup
	for potId, potPercentage := range client.Pots {
		potTransferValue, err := transferValue.Mult(money.MonetaryAmount{Value: potPercentage, Currency: transferValue.Currency})
		if err != nil {
			// TODO: Group errors so some paths can run instead of failing all of em.
			return errors.Annotatef(err, "Failed to calculate pot split for transfer. potId: %v potPercentage: %v total transfer value: %v", potId, potPercentage, transferValue)
		}

		idempotencyKey := clientId + potId + transaction.Id
		log.Printf("Idempotency key")

		transfersWG.Add(1)
		go p.processTransferForPot(&transfersWG, potId, clientId, *potTransferValue, idempotencyKey)
	}
	transfersWG.Wait()

	return nil
}

func (p *ParallelTransactionProcessor) processTransferForPot(wg *sync.WaitGroup, potId string, requestorId string, amount money.MonetaryAmount, idempotencyKey string) error {
	defer wg.Done()
	if err := p.potTransferService.TransferCash(potId, requestorId, money.CREDIT, amount, idempotencyKey); err != nil {
		return errors.Annotatef(err, "Failed to process transfer for pot %v, amount: %v, requestorId: %v", potId, amount, requestorId)
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
