package repositories

import (
	"models"
)

type DynamoTokenRepository struct{}

func (r *DynamoTokenRepository) Get() models.Token {
	return Token{}
}
