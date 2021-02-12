package tdynamo

/**
This is for partially wrapping the AWS DynamoDB interface itself, to allow us to mock out the methods we
actually use with much greater ease.
*/

import (
	adynamo "github.com/aws/aws-sdk-go/service/dynamodb"
)

type DynamoDbInterface interface {
	GetItem(*adynamo.GetItemInput) (*adynamo.GetItemOutput, error)
}
