package database

import (
	"reflect"

	"github.com/stretchr/testify/mock"
)

type RepositoryMock struct {
	mock.Mock
}

/**
When using this, one can provide an arguement after the expected error return type. This value
will be cloned into arg3's (a pointer) destination.
*/
func (r *RepositoryMock) GetByUniqueField(arg1 string, arg2 string, arg3 interface{}) error {
	args := r.Called(arg1, arg2, arg3)
	if args.Get(1) != nil {
		cloneValue(args.Get(1), arg3)
	}
	return args.Error(0)
}

func cloneValue(source interface{}, destin interface{}) {
	x := reflect.ValueOf(source)
	if x.Kind() == reflect.Ptr {
		starX := x.Elem()
		y := reflect.New(starX.Type())
		starY := y.Elem()
		starY.Set(starX)
		reflect.ValueOf(destin).Elem().Set(y.Elem())
	} else {
		destin = x.Interface()
	}
}

func testRepositoryImplementsInterface() Repository {
	return new(RepositoryMock)
}
