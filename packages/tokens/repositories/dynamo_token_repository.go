package repositories

import (
	"errors"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/monzo/terrors"
	"theodo.red/creditcompanion/packages/tokens/models"
)

type DynamoTokenRepository struct {
	db        DynamoDbInterface
	tableName string
}

type DynamoDbInterface interface {
	GetItem(*dynamodb.GetItemInput) (*dynamodb.GetItemOutput, error)
}

func (r *DynamoTokenRepository) Get(id string) (models.Token, error) {
	var token models.Token

	result, err := r.db.GetItem(&dynamodb.GetItemInput{
		TableName: aws.String(r.tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"Id": {
				S: &id,
			},
		}})
	if err != nil {
		// Don't log errors til you handle them
		return token, terrors.Wrap(err, map[string]string{
			"itemId": id,
		})
	}

	// type safe type conversion
	// terr,ok := err.(terrors.Error)

	if result.Item == nil {
		msg := "Token " + id + " could not be found."
		return token, errors.New(msg)
	}

	err = dynamodbattribute.UnmarshalMap(result.Item, &token)
	if err != nil {
		// Panic is bad, like sys.exit
		// panic(fmt.Sprintf("Failed to unmarshall record, %v", err))
	}

	return token, nil
}

func NewDynamoTokenRepository(db DynamoDbInterface) *DynamoTokenRepository {
	repo := new(DynamoTokenRepository)
	repo.db = db
	repo.tableName = "tokens"
	return repo
}
