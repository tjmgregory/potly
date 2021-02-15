package clirepo

import "theodo.red/creditcompanion/packages/clients"

type ClientRepository interface {
	Get(id string) (*clients.Client, error)
	GetByEmail(email string) (*clients.Client, error)
}
