package repositories

import (
	"testing"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"theodo.red/creditcompanion/packages/tokens/models"
)

type DynamoDbMock struct {
	mock.Mock
}

func (m *DynamoDbMock) GetItem(input *dynamodb.GetItemInput) (*dynamodb.GetItemOutput, error) {
	args := m.Called(input)
	return args.Get(0).(*dynamodb.GetItemOutput), args.Error(1)
}

func TestGetsAToken(t *testing.T) {
	dynamoDBMock := new(DynamoDbMock)

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

	tokenId := "tokenId"
	dynamoDBMock.On("GetItem", &dynamodb.GetItemInput{
		TableName: aws.String("tokens"),
		Key: map[string]*dynamodb.AttributeValue{
			"Id": {
				S: &tokenId,
			},
		}}).Return(mockResponse, nil)

	tokenRepo := NewDynamoTokenRepository(dynamoDBMock)

	result, err := tokenRepo.Get(tokenId)
	require.NoError(t, err)

	assert.Equal(t, models.Token{Id: mockTokenId, Owner: mockTokenOwner, Token: mockTokenValue, ExpiresAfter: mockTokenExpiresAfter}, *result)
}

// Should mock as little as possible as long as its not slow to startup/teardown
