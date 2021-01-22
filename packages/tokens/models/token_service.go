package models

type TokenService interface {
	GetTokenById(id string) (*Token, error)
}
