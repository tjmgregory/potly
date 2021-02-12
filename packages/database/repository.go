package database

type Repository interface {
	GetByUniqueField(fieldName string, value string, dest interface{}) error
}
