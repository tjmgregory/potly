package models

type ClientRepository interface {
	Get(id string) (*Client, error)
	GetByEmail(email string) (*Client, error)
}
