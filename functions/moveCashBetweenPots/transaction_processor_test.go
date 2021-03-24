package main

import (
	"testing"

	"github.com/juju/errors"
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

	// And the transfer was made
	potTransferServiceMock.AssertExpectations(t)

	assert.Nil(t, err)
}

func TestProcessesMultipleLinkedAccountsWithMultiplePotsEach(t *testing.T) {
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
			"client-123": 0.6,
			"client-456": 0.4,
		},
		Total: money.MonetaryAmount{
			Value:    160.0,
			Currency: money.GBP,
		},
		TransactionDirection: money.DEBIT,
		Description:          "some-description",
		TransactedAt:         "transacted-at-timestamp",
	}

	// And we can find each client
	clientRepoMock.On("Get", "client-123").Return(&clients.Client{
		Id:        "client-123",
		Email:     "test@email.com",
		CreatedAt: "client-created-timestamp",
		Pots: map[string]float32{
			"pot-111": 0.8,
			"pot-112": 0.2,
		},
	}, nil)

	// and this client has a greater cumulative multiplier than x1.0 on their movements
	clientRepoMock.On("Get", "client-456").Return(&clients.Client{
		Id:        "client-456",
		Email:     "test@email.com",
		CreatedAt: "client-created-timestamp",
		Pots: map[string]float32{
			"pot-221": 1.0,
			"pot-222": 1.2,
		},
	}, nil)

	// And the tranfers all succeed
	// 160 * 0.6 * 0.8
	potTransferServiceMock.On("TransferCash", "pot-111", "client-123", money.CREDIT, money.MonetaryAmount{Value: 76.8, Currency: money.GBP}, "client-123pot-111transaction-123").Return(nil)
	// 160 * 0.6 * 0.2
	potTransferServiceMock.On("TransferCash", "pot-112", "client-123", money.CREDIT, money.MonetaryAmount{Value: 19.2, Currency: money.GBP}, "client-123pot-112transaction-123").Return(nil)
	// 160 * 0.4 * 1.0
	potTransferServiceMock.On("TransferCash", "pot-221", "client-456", money.CREDIT, money.MonetaryAmount{Value: 64.0, Currency: money.GBP}, "client-456pot-221transaction-123").Return(nil)
	// 160 * 0.4 * 1.2
	potTransferServiceMock.On("TransferCash", "pot-222", "client-456", money.CREDIT, money.MonetaryAmount{Value: 76.8, Currency: money.GBP}, "client-456pot-222transaction-123").Return(nil)

	// When we call the function, it succeeds without error
	err := processorUnderTest.Process(funcArgTransaction)

	// And all transfers were made
	potTransferServiceMock.AssertExpectations(t)

	assert.Nil(t, err)
}

func TestProcessesAllOtherPotsWhenOneErrorsAndReturnsTheError(t *testing.T) {
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
			"client-123": 0.6,
			"client-456": 0.4,
		},
		Total: money.MonetaryAmount{
			Value:    160.0,
			Currency: money.GBP,
		},
		TransactionDirection: money.DEBIT,
		Description:          "some-description",
		TransactedAt:         "transacted-at-timestamp",
	}

	// And we can find each client
	clientRepoMock.On("Get", "client-123").Return(&clients.Client{
		Id:        "client-123",
		Email:     "test@email.com",
		CreatedAt: "client-created-timestamp",
		Pots: map[string]float32{
			"pot-111": 0.8,
			"pot-112": 0.2,
		},
	}, nil)

	// and this client has a greater cumulative multiplier than x1.0 on their movements
	clientRepoMock.On("Get", "client-456").Return(&clients.Client{
		Id:        "client-456",
		Email:     "test@email.com",
		CreatedAt: "client-created-timestamp",
		Pots: map[string]float32{
			"pot-221": 1.0,
			"pot-222": 1.2,
		},
	}, nil)

	// And these tranfers all succeed
	// 160 * 0.6 * 0.8
	potTransferServiceMock.On("TransferCash", "pot-111", "client-123", money.CREDIT, money.MonetaryAmount{Value: 76.8, Currency: money.GBP}, "client-123pot-111transaction-123").Return(nil)
	// 160 * 0.6 * 0.2
	potTransferServiceMock.On("TransferCash", "pot-112", "client-123", money.CREDIT, money.MonetaryAmount{Value: 19.2, Currency: money.GBP}, "client-123pot-112transaction-123").Return(nil)
	// 160 * 0.4 * 1.2
	potTransferServiceMock.On("TransferCash", "pot-222", "client-456", money.CREDIT, money.MonetaryAmount{Value: 76.8, Currency: money.GBP}, "client-456pot-222transaction-123").Return(nil)

	// And this transfer fails
	mockErr := errors.New("test error")
	potTransferServiceMock.On("TransferCash", "pot-221", "client-456", money.CREDIT, money.MonetaryAmount{Value: 64.0, Currency: money.GBP}, "client-456pot-221transaction-123").Return(mockErr)

	// When we call the function, it propogates the error
	resultErr := processorUnderTest.Process(funcArgTransaction)

	// And all transfers were made
	potTransferServiceMock.AssertExpectations(t)

	assert.Equal(t, mockErr, errors.Cause(resultErr))
}
