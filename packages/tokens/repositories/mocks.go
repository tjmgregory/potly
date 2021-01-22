package repositories

import (
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/stretchr/testify/mock"
	"theodo.red/creditcompanion/packages/tokens/models"
)

type DynamoDbMock struct {
	mock.Mock
}

func (m *DynamoDbMock) GetItem(input *dynamodb.GetItemInput) (*dynamodb.GetItemOutput, error) {
	args := m.Called(input)
	returnValue, ok := args.Get(0).(*dynamodb.GetItemOutput)
	if !ok {
		return nil, args.Error(1)
	}
	return returnValue, args.Error(1)
}

type TokenRepositoryMock struct {
	mock.Mock
}

func (m *TokenRepositoryMock) Get(input string) (*models.Token, error) {
	args := m.Called(input)
	returnValue, ok := args.Get(0).(*models.Token)
	if !ok {
		return nil, args.Error(1)
	}
	return returnValue, args.Error(1)
}

func (m *TokenRepositoryMock) Set(input string, token *models.Token) error {
	args := m.Called(input)
	return args.Error(0)
}
