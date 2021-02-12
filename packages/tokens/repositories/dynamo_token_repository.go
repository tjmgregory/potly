package repositories

import (
	"github.com/juju/errors"
	"theodo.red/creditcompanion/packages/aws/dynamodb"
	"theodo.red/creditcompanion/packages/tokens/models"
)

type TokenRepository interface {
	Get(id string) (*models.Token, error)
}

type DynamoTokenRepository struct {
	repo dynamodb.DynamoRepository
}

func (r *DynamoTokenRepository) Get(id string) (*models.Token, error) {
	token := new(models.Token)
	err := r.repo.Get(id, token)
	if err != nil {
		return nil, errors.Annotate(err, "Call to marshalling repo failed.")
	}
	return token, nil
}

func NewTokenRepository(db dynamodb.DynamoDbInterface) TokenRepository {
	repo := new(DynamoTokenRepository)
	marshallingRepo := dynamodb.NewMarshallingDynamoRepository(db, "token")
	repo.repo = marshallingRepo

	return repo
}
