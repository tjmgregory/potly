package mocks

import (
	"github.com/stretchr/testify/mock"
	"theodo.red/creditcompanion/packages/clients/models"
)

type ClientRepositoryMock struct {
	mock.Mock
}

func (m *ClientRepositoryMock) Get(arg1 string) (*models.Client, error) {
	args := m.Called(arg1)
	returnValue, ok := args.Get(0).(*models.Client)
	if !ok {
		return nil, args.Error(1)
	}
	return returnValue, args.Error(1)
}

func (m *ClientRepositoryMock) GetByEmail(arg1 string) (*models.Client, error) {
	args := m.Called(arg1)
	returnValue, ok := args.Get(0).(*models.Client)
	if !ok {
		return nil, args.Error(1)
	}
	return returnValue, args.Error(1)
}

func testClientRepositoryMockImplementsInterface() models.ClientRepository {
	return new(ClientRepositoryMock)
}
