package tokserv

import (
	"github.com/stretchr/testify/mock"
	"theodo.red/creditcompanion/packages/tokens"
)

type TokenRefreshServiceMock struct {
	mock.Mock
}

func (m *TokenRefreshServiceMock) RefreshToken(token *tokens.Token) (*tokens.Token, error) {
	args := m.Called(token)
	returnValue, ok := args.Get(0).(*tokens.Token)
	if !ok {
		return nil, args.Error(1)
	}
	return returnValue, args.Error(1)
}

func testTokenRefreshServiceMockInterfaceInheritance() TokenRefreshService {
	return new(TokenRefreshServiceMock)
}
