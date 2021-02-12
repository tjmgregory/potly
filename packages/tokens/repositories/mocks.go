package repositories

import (
	"github.com/stretchr/testify/mock"
	"theodo.red/creditcompanion/packages/tokens/models"
)

type TokenRepositoryMock struct {
	mock.Mock
}

func (m *TokenRepositoryMock) Get(id string) (*models.Token, error) {
	args := m.Called(id)
	returnValue, ok := args.Get(0).(*models.Token)
	if !ok {
		return nil, args.Error(1)
	}
	return returnValue, args.Error(1)
}

func (m *TokenRepositoryMock) Set(id string, token *models.Token) error {
	args := m.Called(id, token)
	return args.Error(0)
}

func testTokenRepositoryMockImplementsInterface() models.TokenRepository {
	return new(TokenRepositoryMock)
}
