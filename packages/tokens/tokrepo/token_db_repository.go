package tokrepo

import (
	"github.com/juju/errors"
	"theodo.red/creditcompanion/packages/database"
	"theodo.red/creditcompanion/packages/database/marsh"
	"theodo.red/creditcompanion/packages/database/tdynamo"
	"theodo.red/creditcompanion/packages/tokens"
)

type TokenDBRepository struct {
	repo database.Repository
}

func (r *TokenDBRepository) Get(id string) (*tokens.Token, error) {
	token := new(tokens.Token)
	err := r.repo.Get(id, token)
	if err != nil {
		return nil, errors.Annotate(err, "Call to repo failed.")
	}
	return token, nil
}

func (r *TokenDBRepository) Set(id string, token *tokens.Token) error {
	// TODO
	return nil
}

func NewDynamoTokenRepository(db tdynamo.DynamoDbInterface) TokenRepository {
	repo := new(TokenDBRepository)
	marshallingRepo := marsh.NewMarshallingDynamoRepository(db, "tokens")
	repo.repo = marshallingRepo

	return repo
}
