package dynamodb

import (
	"reflect"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/juju/errors"
)

type MarshallingDynamoRepository struct {
	db        DynamoDbInterface
	tableName string
}

type MarshallingRepository interface {
	Get(id string, dest interface{}) error
	// Set(id string, source *interface{}) error
}

func (r *MarshallingDynamoRepository) Get(id string, dest interface{}) error {
	if reflect.TypeOf(dest).Kind() != reflect.Ptr {
		return errors.New("Token " + id + " could not be found.")
	}

	preMarshalReplica := reflect.New(reflect.ValueOf(dest).Elem().Type())

	result, getErr := r.db.GetItem(&dynamodb.GetItemInput{
		TableName: aws.String(r.tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"Id": {
				S: &id,
			},
		}})
	if getErr != nil {
		// Don't log errors til you handle them
		return errors.Annotate(getErr, "Call to retrieve item from db failed.")
	}

	if result.Item == nil {
		return errors.New("Token " + id + " could not be found.")
	}

	unmarshalErr := dynamodbattribute.UnmarshalMap(result.Item, dest)
	postMarshalReplica := reflect.New(reflect.ValueOf(dest).Elem().Type())
	if unmarshalErr != nil || preMarshalReplica == postMarshalReplica {
		return errors.New("Failed to unmarshal " + id)
	}

	return nil
}

// func (r *MarshallingDynamoRepository) Set(id string, token *models.Token) error {
//     // TODO: Implement this.
//     return nil
// }

func NewDynamoRepository(db DynamoDbInterface) MarshallingRepository {
	repo := new(MarshallingDynamoRepository)
	repo.db = db
	repo.tableName = "tokens"
	return repo
}
