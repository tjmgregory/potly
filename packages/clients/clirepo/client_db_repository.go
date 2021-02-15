package clirepo

import (
	"github.com/juju/errors"
	"theodo.red/creditcompanion/packages/clients"
	"theodo.red/creditcompanion/packages/database"
	"theodo.red/creditcompanion/packages/database/marsh"
	"theodo.red/creditcompanion/packages/database/tdynamo"
)

type ClientDBRepository struct {
	repo database.Repository
}

func (r *ClientDBRepository) Get(id string) (*clients.Client, error) {
	client := new(clients.Client)
	err := r.repo.GetByUniqueField("id", id, client)
	if err != nil {
		return nil, errors.Annotate(err, "Call to repo failed.")
	}
	return client, nil
}

func (r *ClientDBRepository) GetByEmail(email string) (*clients.Client, error) {
	client := new(clients.Client)
	err := r.repo.GetByUniqueField("email", email, client)
	if err != nil {
		return nil, errors.Annotate(err, "Call to repo failed.")
	}
	return client, nil
}

func NewDynamoClientRepository(db tdynamo.DynamoDbInterface) ClientRepository {
	repo := new(ClientDBRepository)
	marshallingRepo := marsh.NewMarshallingDynamoRepository(db, "clients")
	repo.repo = marshallingRepo

	return repo
}
