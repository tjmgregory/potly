package main

import (
	"testing"

	"theodo.red/creditcompanion/packages/clients/clirepo"
	"theodo.red/creditcompanion/packages/logging"
	"theodo.red/creditcompanion/packages/pot"
)

func TestProcessesATransactionSuccessfully(t *testing.T) {
	// Given we build the processor with mocks
	loggerMock := new(logging.LoggerMock)
	clientRepoMock := new(clirepo.ClientRepositoryMock)
	potTransferServiceMock := pot.NewPotTransferServiceMock()

	processorUnderTest := ParallelTransactionProcessor{
		logger:             loggerMock,
		clientRepo:         clientRepoMock,
		potTransferService: potTransferServiceMock,
	}

	// And all the right results are returned

	// All the good things happen
}
