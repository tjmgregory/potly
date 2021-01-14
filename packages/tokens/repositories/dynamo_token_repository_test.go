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

	mockString := "asdfasdf"
	mockResponse := &dynamodb.GetItemOutput{
		Item: map[string]*dynamodb.AttributeValue{
			"token": {
				S: &mockString,
			},
		},
	}

	idInput := "some-id"
	dynamoDBMock.On("GetItem", &dynamodb.GetItemInput{
		TableName: aws.String("tokens"),
		Key: map[string]*dynamodb.AttributeValue{
			"Id": {
				S: &idInput,
			},
		}}).Return(mockResponse, nil)

	tokenRepo := NewDynamoTokenRepository(dynamoDBMock)

	result, err := tokenRepo.Get("some-id")
	require.NoError(t, err)

	assert.Equal(t, models.Token{Token: "asdfasdf"}, result)
}

// Should mock as little as possible as long as its not slow to startup/teardown
