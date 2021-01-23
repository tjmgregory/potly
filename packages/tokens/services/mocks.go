package services

import (
	"github.com/stretchr/testify/mock"
	"theodo.red/creditcompanion/packages/tokens/models"
)

type TokenRefreshServiceMock struct {
	mock.Mock
}

func (m *TokenRefreshServiceMock) RefreshToken(token *models.Token) (*models.Token, error) {
	args := m.Called(token)
	returnValue, ok := args.Get(0).(*models.Token)
	if !ok {
		return nil, args.Error(1)
	}
	return returnValue, args.Error(1)
}

func testTokenRefreshServiceMockInterfaceInheritance() TokenRefreshService {
	return new(TokenRefreshServiceMock)
}
