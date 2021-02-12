package tdynamo

import (
	adynamo "github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/stretchr/testify/mock"
)

type DynamoDbMock struct {
	mock.Mock
}

func (m *DynamoDbMock) GetItem(input *adynamo.GetItemInput) (*adynamo.GetItemOutput, error) {
	args := m.Called(input)
	returnValue, ok := args.Get(0).(*adynamo.GetItemOutput)
	if !ok {
		return nil, args.Error(1)
	}
	return returnValue, args.Error(1)
}

func testDynamoDbMockImplementsInterface() DynamoDbInterface {
	return new(DynamoDbMock)
}
