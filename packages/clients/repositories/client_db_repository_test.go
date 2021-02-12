package repositories

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"theodo.red/creditcompanion/packages/clients/models"
	"theodo.red/creditcompanion/packages/database"
)

func TestGetCallsTheRepoCorrectly(t *testing.T) {
	// Given a mock repo
	repoMock := new(database.RepositoryMock)

	// And given a mock reponse from the repo
	mockResponse := new(models.Client)
	mockResponse.Id = "id-123"
	mockResponse.Email = "test@email.com"
	mockResponse.CreatedAt = "some-timestamp"

	repoMock.On("GetByUniqueField", "Id", "id-123", mock.Anything).Return(nil, mockResponse)

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

// TODO: Add a test for Get and GetByEmail just checking it propogates the error.

func TestGetByEmailCallsTheRepoCorrectly(t *testing.T) {
	// Given a mock repo
	repoMock := new(database.RepositoryMock)

	// And given a mock reponse from the repo
	mockResponse := new(models.Client)
	mockResponse.Id = "id-123"
	mockResponse.Email = "test@email.com"
	mockResponse.CreatedAt = "some-timestamp"

	repoMock.On("GetByUniqueField", "Email", "test@email.com", mock.Anything).Return(nil, mockResponse)

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
