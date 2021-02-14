package main

import (
	"context"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"theodo.red/creditcompanion/packages/logging"
)

func handleRequest(ctx context.Context, e events.DynamoDBEvent) {
	logger := logging.NewConsoleLogger()

	for _, record := range e.Records {
		logger.LogDebug("Processing request data for event ID", record.EventID, "type", record.EventName)
		logger.LogDebug("Processing request data for event ID %s, type %s.\n", record.EventID, record.EventName)

		// Print new values for attributes of type String
		for name, value := range record.Change.NewImage {
			if value.DataType() == events.DataTypeString {
				logger.LogDebug("Attribute name:", name, "value:", value.String())
			}
		}
	}
}

func main() {
	lambda.Start(handleRequest)
}
