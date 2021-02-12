package database

import (
	"github.com/stretchr/testify/mock"
)

type RepositoryMock struct {
	mock.Mock
}

func (r *RepositoryMock) Get(id string, dest interface{}) error {
	args := r.Called(id, dest)
	return args.Error(0)
}

func testRepositoryImplementsInterface() Repository {
	return new(RepositoryMock)
}
