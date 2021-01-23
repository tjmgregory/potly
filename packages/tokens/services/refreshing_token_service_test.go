package services

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"theodo.red/creditcompanion/packages/teatime"
	"theodo.red/creditcompanion/packages/tokens/models"
	"theodo.red/creditcompanion/packages/tokens/repositories"
)

func TestReturnsTheRepoTokenIfItIsNotExpiringSoon(t *testing.T) {
	// Given the token id
	tokenId := "token123"

	// And given the token repo returns a token
	mockTokenRepo := new(repositories.TokenRepositoryMock)
	mockToken := models.Token{
		Id:           tokenId,
		Owner:        "owner-123",
		Token:        "token-value-123",
		ExpiresAfter: "2020-01-23T12:00:00.000Z",
	}
	mockTokenRepo.On("Get", tokenId).Return(&mockToken, nil)

	// And given the time difference thresold is 100 seconds
	tokenRefreshThresholdSeconds := int64(100)

	// And given the clock is far from this time
	// TODO: Create a public clock mock
	timeNow, _err := time.Parse(time.RFC3339, "2020-01-22T12:00:00.000Z")
	if _err != nil {

	}
	clockMock := new(teatime.ClockMock)
	clockMock.On("Now", mock.Anything).Return(timeNow)

	// And given we create the service
	tokenService := new(RefreshingTokenService)
	tokenService.tokenRepository = mockTokenRepo
	tokenService.tokenRefreshThresholdSeconds = tokenRefreshThresholdSeconds
	tokenService.clock = clockMock

	// When we call the service
	result, err := tokenService.GetTokenById(tokenId)

	// There is no error
	assert.Nil(t, err)

	// It's the same token
	assert.Equal(t, &mockToken, result)
}
