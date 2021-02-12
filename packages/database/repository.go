package database

type Repository interface {
	Get(id string, dest interface{}) error
	// Set(id string, source interface{}) error
}
