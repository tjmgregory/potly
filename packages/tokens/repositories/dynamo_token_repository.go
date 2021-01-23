package repositories

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/juju/errors"
	"theodo.red/creditcompanion/packages/tokens/models"
)

type DynamoTokenRepository struct {
	db        DynamoDbInterface
	tableName string
}

type DynamoDbInterface interface {
	GetItem(*dynamodb.GetItemInput) (*dynamodb.GetItemOutput, error)
}

func (r *DynamoTokenRepository) Get(id string) (*models.Token, error) {
	token := &models.Token{}

	result, getErr := r.db.GetItem(&dynamodb.GetItemInput{
		TableName: aws.String(r.tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"Id": {
				S: &id,
			},
		}})
	if getErr != nil {
		// Don't log errors til you handle them
		return nil, errors.Annotate(getErr, "Call to retrieve item from db failed.")
	}

	if result.Item == nil {
		return nil, errors.New("Token " + id + " could not be found.")
	}

	unmarshalErr := dynamodbattribute.UnmarshalMap(result.Item, &token)
	if unmarshalErr != nil || (models.Token{}) == *token {
		return nil, errors.New("Failed to unmarshal token " + id)
	}

	return token, nil
}

func (r *DynamoTokenRepository) Set(id string, token *models.Token) error {
	// TODO: Implement this.
	return nil
}

func NewDynamoTokenRepository(db DynamoDbInterface) *DynamoTokenRepository {
	repo := new(DynamoTokenRepository)
	repo.db = db
	repo.tableName = "tokens"
	return repo
}
