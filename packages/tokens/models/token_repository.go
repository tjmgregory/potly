package models

type TokenRepository interface {
	Get(id string) Token
}
