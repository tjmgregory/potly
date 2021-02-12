package repositories

import (
	"github.com/juju/errors"
	"theodo.red/creditcompanion/packages/database"
	"theodo.red/creditcompanion/packages/database/marsh"
	"theodo.red/creditcompanion/packages/database/tdynamo"
	"theodo.red/creditcompanion/packages/tokens/models"
)

type TokenRepository interface {
	Get(id string) (*models.Token, error)
}

type DynamoTokenRepository struct {
	repo database.Repository
}

func (r *DynamoTokenRepository) Get(id string) (*models.Token, error) {
	token := new(models.Token)
	err := r.repo.Get(id, token)
	if err != nil {
		return nil, errors.Annotate(err, "Call to marshalling repo failed.")
	}
	return token, nil
}

func NewTokenRepository(db tdynamo.DynamoDbInterface) TokenRepository {
	repo := new(DynamoTokenRepository)
	marshallingRepo := marsh.NewMarshallingDynamoRepository(db, "tokens")
	repo.repo = marshallingRepo

	return repo
}
