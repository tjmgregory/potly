package tokrepo

import "theodo.red/creditcompanion/packages/tokens"

type TokenRepository interface {
	Get(id string) (*tokens.Token, error)
	Set(id string, token *tokens.Token) error
}
