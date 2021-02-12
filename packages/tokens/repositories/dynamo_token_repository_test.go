package repositories

/**
These tests are heavily dependent on the implementation of the marshalling db repo, and once confidence in the database module is proven,
these should be stripped down to testing upon a database.RepositoryMock, not upon a database.tdynamo.DynamoDbMock
*/

import (
	"testing"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/juju/errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"theodo.red/creditcompanion/packages/database/tdynamo"
	"theodo.red/creditcompanion/packages/tokens/models"
)

func TestGetsAToken(t *testing.T) {
	// Given a mock dynamodb
	dynamoDBMock := new(tdynamo.DynamoDbMock)

	// And given a mock db response

	// The unmarshaller will search for exact matches first when mapping the AttributeValue input
	// to a struct, and then it will search case-insensitvely.
	// https://docs.aws.amazon.com/sdk-for-go/api/service/dynamodb/dynamodbattribute/#Unmarshal
	mockTokenValue := "tokenValue123"
	mockTokenOwner := "owner123"
	mockTokenId := "tokenId123"
	mockTokenExpiresAfter := "2020-01-18T12:00:00.000Z"
	mockResponse := &dynamodb.GetItemOutput{
		Item: map[string]*dynamodb.AttributeValue{
			"id": {
				S: &mockTokenId,
			},
			"owner": {
				S: &mockTokenOwner,
			},
			"token": {
				S: &mockTokenValue,
			},
			"expiresAfter": {
				S: &mockTokenExpiresAfter,
			},
		},
	}

	dynamoDBMock.On("GetItem", &dynamodb.GetItemInput{
		TableName: aws.String("tokens"),
		Key: map[string]*dynamodb.AttributeValue{
			"Id": {
				S: &mockTokenId,
			},
		}}).Return(mockResponse, nil)

	// And given the repository
	tokenRepo := NewTokenRepository(dynamoDBMock)

	// When we get the token from the repo
	result, err := tokenRepo.Get(mockTokenId)

	// We receive the mapped struct back.
	require.NoError(t, err)
	assert.Equal(t, models.Token{Id: mockTokenId, Owner: mockTokenOwner, Token: mockTokenValue, ExpiresAfter: mockTokenExpiresAfter}, *result)
}

func TestAnnotatesDbRequestCallError(t *testing.T) {
	// Given the db returns an error when getting the token
	dynamoDBMock := new(tdynamo.DynamoDbMock)

	mockError := errors.New("Mock error.")
	dynamoDBMock.On("GetItem", mock.Anything).Return(nil, mockError)

	tokenRepo := NewTokenRepository(dynamoDBMock)

	// When we get a token
	tokenId := "tokenId"
	result, err := tokenRepo.Get(tokenId)

	// We receive no result and the error is annotated
	assert.Nil(t, result)
	assert.Equal(t, mockError, errors.Cause(err))
	assert.Contains(t, err.Error(), "Call to marshalling repo failed.")
}

func TestReturnsAnErrorIfTheItemCannotBeFound(t *testing.T) {
	// Given the db returns a nil item
	dynamoDBMock := new(tdynamo.DynamoDbMock)

	dynamoDBMock.On("GetItem", mock.Anything).Return(&dynamodb.GetItemOutput{Item: nil}, nil)

	tokenRepo := NewTokenRepository(dynamoDBMock)

	// When we get a token
	tokenId := "tokenId"
	result, err := tokenRepo.Get(tokenId)

	// We receive no result and the error is annotated
	assert.Nil(t, result)
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "Call to marshalling repo failed.")
}

func TestReturnsAnErrorIfUnmarshallingReturnsNullValueToken(t *testing.T) {
	// Given the db returns unexpected data
	dynamoDBMock := new(tdynamo.DynamoDbMock)

	mockResultValue := "Mock result value"
	mockResponse := &dynamodb.GetItemOutput{
		Item: map[string]*dynamodb.AttributeValue{
			"SomethingUnexpected": {
				S: &mockResultValue,
			},
		},
	}
	dynamoDBMock.On("GetItem", mock.Anything).Return(mockResponse, nil)

	tokenRepo := NewTokenRepository(dynamoDBMock)

	// When we get a token
	result, err := tokenRepo.Get("tokenId")

	// We receive no result and the error is annotated
	assert.Nil(t, result)
	assert.Contains(t, err.Error(), "Call to marshalling repo failed.")
}

// Should mock as little as possible as long as its not slow to startup/teardown
