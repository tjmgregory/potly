package tokserv

import (
	"theodo.red/creditcompanion/packages/tokens"
)

type TokenRefreshService interface {
	RefreshToken(*tokens.Token) (*tokens.Token, error)
}

type DummyTokenRefreshService struct{}

func (*DummyTokenRefreshService) RefreshToken(token *tokens.Token) (*tokens.Token, error) {
	// TODO: This function.
	return token, nil
}

func NewDummyTokenRefreshService() TokenRefreshService {
	return new(DummyTokenRefreshService)
}
