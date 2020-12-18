package main

import (
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"theodo.red/creditcompanion/functions/login/models"
	"theodo.red/creditcompanion/functions/login/routes"
	"theodo.red/creditcompanion/packages/logging"
)

// Response is of type APIGatewayProxyResponse since we're leveraging the
// AWS Lambda Proxy Request functionality (default behavior)
//
// https://serverless.com/framework/docs/providers/aws/events/apigateway/#lambda-proxy-integration

// Handler is our lambda handler invoked by the `lambda.Start` function call
func Handler(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	logger := new(logging.Logger)
	logger.LogDebug("I logged a thing.")

	router := models.RouterMap{
		"/login": models.RouterVerbMap{
			"GET": routes.LoginGet,
		},
	}

	response := router[req.Resource][req.HTTPMethod]()

	resp := events.APIGatewayProxyResponse{
		StatusCode:      response.StatusCode,
		IsBase64Encoded: response.IsBase64Encoded,
		Body:            response.Body,
		Headers:         response.Headers,
	}

	return resp, nil
}

func main() {
	lambda.Start(Handler)
}
