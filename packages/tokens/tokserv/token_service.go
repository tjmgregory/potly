package tokserv

import "theodo.red/creditcompanion/packages/tokens"

type TokenService interface {
	GetTokenById(id string) (*tokens.Token, error)
}
