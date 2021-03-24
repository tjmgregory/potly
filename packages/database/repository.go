package database

type Repository interface {
	Get(id string, dest interface{}) error
	GetByUniqueField(fieldName string, value string, dest interface{}) error
}
