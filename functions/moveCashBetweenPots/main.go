package main

import (
	"context"
	"encoding/json"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"theodo.red/creditcompanion/packages/clients/repositories"
	"theodo.red/creditcompanion/packages/logging"
)

type Currency string

const (
	GBP Currency = "GBP"
)

type TransactionType string

const (
	CREDIT TransactionType = "CREDIT"
	DEBIT                  = "DEBIT"
)

type MonetaryAmount struct {
	Value    float32  `dynamodbav:value`
	Currency Currency `dynamodbav:currency`
}

type CreditTransaction struct {
	Id              string             `dynamodbav:id`
	CreditSource    string             `dynamodbav:creditSource`
	CreatedAt       string             `dynamodbav:createdAt`
	LinkedClients   map[string]float32 `dynamodbav:linkedClients`
	Total           MonetaryAmount     `dynamodbav:total`
	TransactionType TransactionType    `dynamodbav:transactionType`
	Description     string             `dynamodbav:description`
	TransactedAt    string             `dynamodbav:transactedAt`
}

func handleRequest(ctx context.Context, e events.DynamoDBEvent) {
	sess := session.Must(session.NewSession())
	dynamo := dynamodb.New(sess)
	clientRepo := repositories.NewDynamoClientRepository(dynamo)
	logger := logging.NewConsoleLogger()

	for _, record := range e.Records {
		if record.EventName != "INSERT" {
			logger.LogDebug("Non-insert event occurred, ignoring.")
			continue
		}

		var transaction CreditTransaction
		marshalErr := UnmarshalStreamImage(record.Change.NewImage, &transaction)
		if marshalErr != nil {
			logger.LogError("Failed to unmarshal transaction", marshalErr, record.Change.NewImage)
			return
		}

		logger.LogDebug("Received transaction", transaction)

		for clientId := range transaction.LinkedClients {
			logger.LogDebug("Searching for client", clientId)

			client, clientErr := clientRepo.Get(clientId)
			if clientErr != nil {
				logger.LogError("Failed to retrieve client", clientId, clientErr)
				continue
			}

			logger.LogDebug("Retrieved client", client)
		}
	}
}

// UnmarshalStreamImage converts events.DynamoDBAttributeValue to struct
func UnmarshalStreamImage(attribute map[string]events.DynamoDBAttributeValue, out interface{}) error {

	dbAttrMap := make(map[string]*dynamodb.AttributeValue)

	for k, v := range attribute {

		var dbAttr dynamodb.AttributeValue

		bytes, marshalErr := v.MarshalJSON()
		if marshalErr != nil {
			return marshalErr
		}

		json.Unmarshal(bytes, &dbAttr)
		dbAttrMap[k] = &dbAttr
	}

	return dynamodbattribute.UnmarshalMap(dbAttrMap, out)

}

func main() {
	lambda.Start(handleRequest)
}
