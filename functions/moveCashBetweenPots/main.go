package main

import (
	"context"
	"encoding/json"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"theodo.red/creditcompanion/packages/credtrack"
	"theodo.red/creditcompanion/packages/logging"
)

func handleRequest(ctx context.Context, e events.DynamoDBEvent) {
	sess := session.Must(session.NewSession())
	dynamo := dynamodb.New(sess)
	processor := NewParallelTransactionProcessor(dynamo)
	logger := logging.NewConsoleLogger()

	for _, record := range e.Records {
		if record.EventName != "INSERT" {
			logger.LogDebug("Non-insert event occurred, ignoring.")
			continue
		}

		var transaction credtrack.CreditTransaction
		marshalErr := UnmarshalStreamImage(record.Change.NewImage, &transaction)
		if marshalErr != nil {
			logger.LogError("Failed to unmarshal transaction", marshalErr, record.Change.NewImage)
			return
		}

		logger.LogDebug("Received transaction", transaction)
		processor.Process(transaction)
	}
}

// UnmarshalStreamImage converts events.DynamoDBAttributeValue to struct
/**
This is required due to an unfortunate discrepancy between the AWS events package and the
AWS dynamo package.
There is a signature mismatch in what we receive and what we require, despite them being the same under the hood:
events: map[string]DynamoDBAttributeValue
marshalling: map[string]*dynamodb.AttributeValue
*/
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
