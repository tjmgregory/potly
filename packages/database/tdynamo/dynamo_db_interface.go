package tdynamo

import (
	adynamo "github.com/aws/aws-sdk-go/service/dynamodb"
)

type DynamoDbInterface interface {
	GetItem(*adynamo.GetItemInput) (*adynamo.GetItemOutput, error)
}
