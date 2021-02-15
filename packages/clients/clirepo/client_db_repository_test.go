package clirepo

import (
	"testing"

	"github.com/juju/errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"theodo.red/creditcompanion/packages/clients"
	"theodo.red/creditcompanion/packages/database"
)

func TestGetCallsTheRepoCorrectly(t *testing.T) {
	// Given a mock repo
	repoMock := new(database.RepositoryMock)

	// And given a mock reponse from the repo
	mockResponse := new(clients.Client)
	mockResponse.Id = "id-123"
	mockResponse.Email = "test@email.com"
	mockResponse.CreatedAt = "some-timestamp"

	repoMock.On("GetByUniqueField", "id", "id-123", mock.Anything).Return(nil, mockResponse)

	// And we have built the repo
	repo := &ClientDBRepository{
		repo: repoMock,
	}

	// When we call the function
	result, err := repo.Get("id-123")

	// We receive the struct back
	require.NoError(t, err)
	assert.Equal(t, *mockResponse, *result)
}

func TestGetPropogatesTheRepoError(t *testing.T) {
	// Given a mock repo
	repoMock := new(database.RepositoryMock)

	// And given the repo returns an error
	mockErr := errors.New("test-string")
	repoMock.On("GetByUniqueField", "id", "id-123", mock.Anything).Return(mockErr, nil)

	// And we have built the repo
	repo := &ClientDBRepository{
		repo: repoMock,
	}

	// When we call the function
	result, resultErr := repo.Get("id-123")

	// We receive the struct back
	assert.Nil(t, result)
	assert.Equal(t, mockErr, errors.Cause(resultErr))
	assert.Contains(t, resultErr.Error(), "Call to repo failed.")
}

func TestGetByEmailCallsTheRepoCorrectly(t *testing.T) {
	// Given a mock repo
	repoMock := new(database.RepositoryMock)

	// And given a mock reponse from the repo
	mockResponse := new(clients.Client)
	mockResponse.Id = "id-123"
	mockResponse.Email = "test@email.com"
	mockResponse.CreatedAt = "some-timestamp"

	repoMock.On("GetByUniqueField", "email", "test@email.com", mock.Anything).Return(nil, mockResponse)

	// And we have built the repo
	repo := &ClientDBRepository{
		repo: repoMock,
	}

	// When we call the function
	result, err := repo.GetByEmail("test@email.com")

	// We receive the struct back
	require.NoError(t, err)
	assert.Equal(t, *mockResponse, *result)
}

func TestGetByEmailPropogatesTheRepoError(t *testing.T) {
	// Given a mock repo
	repoMock := new(database.RepositoryMock)

	// And given the repo returns an error
	mockErr := errors.New("test-string")
	repoMock.On("GetByUniqueField", "email", "test@email.com", mock.Anything).Return(mockErr, nil)

	// And we have built the repo
	repo := &ClientDBRepository{
		repo: repoMock,
	}

	// When we call the function
	result, resultErr := repo.GetByEmail("test@email.com")

	// We receive the struct back
	assert.Nil(t, result)
	assert.Equal(t, mockErr, errors.Cause(resultErr))
	assert.Contains(t, resultErr.Error(), "Call to repo failed.")
}
