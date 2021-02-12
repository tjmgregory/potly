package repositories

import (
	"github.com/juju/errors"
	"theodo.red/creditcompanion/packages/database"
	"theodo.red/creditcompanion/packages/database/marsh"
	"theodo.red/creditcompanion/packages/database/tdynamo"
	"theodo.red/creditcompanion/packages/tokens/models"
)

type DBTokenRepository struct {
	repo database.Repository
}

func (r *DBTokenRepository) Get(id string) (*models.Token, error) {
	token := new(models.Token)
	err := r.repo.Get(id, token)
	if err != nil {
		return nil, errors.Annotate(err, "Call to marshalling repo failed.")
	}
	return token, nil
}

func (r *DBTokenRepository) Set(id string, token *models.Token) error {
	// TODO
	return nil
}

func NewDynamoTokenRepository(db tdynamo.DynamoDbInterface) models.TokenRepository {
	repo := new(DBTokenRepository)
	marshallingRepo := marsh.NewMarshallingDynamoRepository(db, "tokens")
	repo.repo = marshallingRepo

	return repo
}
