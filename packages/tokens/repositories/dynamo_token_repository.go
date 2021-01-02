package repositories

import (
	"errors"
	"fmt"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"theodo.red/creditcompanion/packages/tokens/models"
)

type DynamoTokenRepository struct {
	db        *dynamodb.DynamoDB
	tableName string
}

func (r *DynamoTokenRepository) Get(id string) (models.Token, error) {
	var token models.Token

	result, err := r.db.GetItem(&dynamodb.GetItemInput{
		TableName: aws.String(r.tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"Id": id,
		}})

	if err != nil {
		fmt.Println(err.Error())
		return token, err
	}

	if result.Item == nil {
		msg := "Token " + id + " could not be found."
		return token, errors.New(msg)
	}

	token = models.Token{}

	err = dynamodbattribute.UnmarshalMap(result.Item, &token)
	if err != nil {
		panic(fmt.Sprintf("Failed to unmarshall record, %v", err))
	}

	return token, nil
}

func NewDynamoTokenRepository(db *dynamodb.DynamoDB) *DynamoTokenRepository {
	repo := new(DynamoTokenRepository)
	repo.db = db
	repo.tableName = "tokens"
	return repo
}
