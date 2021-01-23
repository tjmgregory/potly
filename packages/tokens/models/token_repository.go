package models

type TokenRepository interface {
	Get(id string) (*Token, error)
	Set(id string, token *Token) error
}
