package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"theodo.red/creditcompanion/packages/clients"
	"theodo.red/creditcompanion/packages/clients/clirepo"
	"theodo.red/creditcompanion/packages/credtrack"
	"theodo.red/creditcompanion/packages/money"
	"theodo.red/creditcompanion/packages/pot"
)

func TestProcessesATransactionSuccessfully(t *testing.T) {
	// Given we build the processor with mocks
	clientRepoMock := new(clirepo.ClientRepositoryMock)
	potTransferServiceMock := new(pot.PotTransferServiceMock)

	processorUnderTest := ParallelTransactionProcessor{
		clientRepo:         clientRepoMock,
		potTransferService: potTransferServiceMock,
	}

	funcArgTransaction := credtrack.CreditTransaction{
		Id:             "transaction-123",
		CreditSourceId: "credit-source-123",
		CreatedAt:      "created-at-timestamp",
		LinkedClients: map[string]float32{
			"client-123": 1.0,
		},
		Total: money.MonetaryAmount{
			Value:    157.89,
			Currency: money.GBP,
		},
		TransactionDirection: money.DEBIT,
		Description:          "some-description",
		TransactedAt:         "transacted-at-timestamp",
	}

	// And we can find a client
	clientRepoMock.On("Get", "client-123").Return(&clients.Client{
		Id:        "client-123",
		Email:     "test@email.com",
		CreatedAt: "client-created-timestamp",
		Pots: map[string]float32{
			"pot-123": 1.0,
		},
	}, nil)

	// And the tranfer service succeeds
	potTransferServiceMock.On("TransferCash", "pot-123", "client-123", money.CREDIT, money.MonetaryAmount{Value: 157.89, Currency: money.GBP}, "client-123pot-123transaction-123").Return(nil)

	// When we call the function, it succeeds
	err := processorUnderTest.Process(funcArgTransaction)

	// The service is called
	assert.True(t, potTransferServiceMock.AssertCalled(t, "TransferCash", "pot-123", "client-123", money.CREDIT, money.MonetaryAmount{Value: 157.89, Currency: money.GBP}, "client-123pot-123transaction-123"))

	assert.Nil(t, err)
}
