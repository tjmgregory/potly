package repositories

import (
	"github.com/juju/errors"
	"theodo.red/creditcompanion/packages/clients/models"
	"theodo.red/creditcompanion/packages/database"
	"theodo.red/creditcompanion/packages/database/marsh"
	"theodo.red/creditcompanion/packages/database/tdynamo"
)

type ClientDBRepository struct {
	repo database.Repository
}

func (r *ClientDBRepository) Get(id string) (*models.Client, error) {
	client := new(models.Client)
	err := r.repo.Get(id, client)
	if err != nil {
		return nil, errors.Annotate(err, "Call to repo failed.")
	}
	return client, nil
}

func (r *ClientDBRepository) GetByEmail(email string) (*models.Client, error) {
	// TODO
	return nil, nil
}

func NewDynamoClientRepository(db tdynamo.DynamoDbInterface) models.ClientRepository {
	repo := new(ClientDBRepository)
	marshallingRepo := marsh.NewMarshallingDynamoRepository(db, "clients")
	repo.repo = marshallingRepo

	return repo
}
