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
		return errors.New("Bad destination pointer passed to marshalling repository.")
	}
	preMarshalReplica := reflect.ValueOf(dest).Elem().Interface()

	result, getErr := r.db.GetItem(&dynamodb.GetItemInput{
		TableName: aws.String(r.tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"Id": {
				S: &id,
			},
		}})
	if getErr != nil {
		// Don't log errors til you handle them
		return errors.Annotate(getErr, "Call to retrieve "+id+" from db failed.")
	}

	if result.Item == nil {
		return errors.New("Item with id " + id + " could not be found.")
	}

	unmarshalErr := dynamodbattribute.UnmarshalMap(result.Item, dest)
	postMarshalReplica := reflect.ValueOf(dest).Elem().Interface()
	if unmarshalErr != nil || preMarshalReplica == postMarshalReplica {
		return errors.New("Failed to unmarshal " + id + ".")
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
