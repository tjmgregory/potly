package main

import (
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"theodo.red/creditcompanion/functions/login/models"
	"theodo.red/creditcompanion/functions/login/routes"
	"theodo.red/creditcompanion/packages/logging"
)

func Handler(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	logger := new(logging.Logger)
	logger.LogDebug(fmt.Sprintf("%s %s", req.HTTPMethod, req.Resource))

	router := models.RouterMap{
		"/login": models.RouterVerbMap{
			"GET": routes.LoginGet,
		},
	}

	response := router[req.Resource][req.HTTPMethod]()
	logger.LogDebug(fmt.Sprintf("Sending response %v", response))

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
