package database

type Repository interface {
	// Deprecated: GetByUniqueField should be used instead.
	Get(id string, dest interface{}) error
	GetByUniqueField(fieldName string, value string, dest interface{}) error
}
