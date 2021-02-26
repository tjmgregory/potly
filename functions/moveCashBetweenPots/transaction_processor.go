package main

import (
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

	transferValue, err := transaction.Total.Mult(money.MonetaryAmount{Value: percentage, Currency: transaction.Total.Currency})
	if err != nil {
		return errors.Annotatef(err, "Failed to calculate transfer value. transaction total: %v, percentage: %v", transaction.Total, percentage)
	}

	client, err := p.clientRepo.Get(clientId)
	if err != nil {
		return errors.Annotatef(err, "Failed to get client %v for transaction %v", clientId, transaction.Id)
	}

	var transfersWG sync.WaitGroup
	for potId, potPercentage := range client.Pots {
		potTransferValue, err := transferValue.Mult(money.MonetaryAmount{Value: potPercentage, Currency: transferValue.Currency})
		if err != nil {
			// TODO: Group errors so some paths can run instead of failing all of em.
			return errors.Annotatef(err, "Failed to calculate pot split for transfer. potId: %v potPercentage: %v total transfer value: %v", potId, potPercentage, transferValue)
		}

		transfersWG.Add(1)
		p.processTransferForPot(&transfersWG, potId, clientId, *potTransferValue)
	}
}

func (p *ParallelTransactionProcessor) processTransferForPot(wg *sync.WaitGroup, potId string, requestorId string, amount money.MonetaryAmount) error {
	defer wg.Done()
	return p.potTransferService.TransferCash(potId, requestorId, money.TransactionDirection.CREDIT, amount)
}

func NewParallelTransactionProcessor(db tdynamo.DynamoDbInterface) TransactionProcessor {
	processor := new(ParallelTransactionProcessor)
	clientRepo := clirepo.NewDynamoClientRepository(db)
	logger := logging.NewConsoleLogger()

	processor.clientRepo = clientRepo
	processor.logger = logger

	return processor
}
