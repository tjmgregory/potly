package database

import (
	"github.com/stretchr/testify/mock"
)

type RepositoryMock struct {
	mock.Mock
}

func (r *RepositoryMock) GetByUniqueField(arg1 string, arg2 string, arg3 interface{}) error {
	args := r.Called(arg1, arg2, arg3)
	// TODO: Will need to populate arg3 with the args data.
	return args.Error(0)
}

func testRepositoryImplementsInterface() Repository {
	return new(RepositoryMock)
}
