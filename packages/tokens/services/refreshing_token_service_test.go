package services

import (
	"testing"
	"time"

	"github.com/juju/errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"theodo.red/creditcompanion/packages/logging"
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
	tokenRefreshThresholdSeconds := 100

	// And given the clock is far before the token expiry
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

func TestRefreshesTheTokenIfItHasExpired(t *testing.T) {
	// Given the token id
	tokenId := "token123"

	// And given the token repo returns a token
	tokenRepoMock := new(repositories.TokenRepositoryMock)
	mockToken := &models.Token{
		Id:           tokenId,
		Owner:        "owner-123",
		Token:        "token-value-123",
		ExpiresAfter: "2020-01-23T12:00:00.000Z",
	}
	tokenRepoMock.On("Get", tokenId).Return(mockToken, nil)

	// And given the time difference thresold is 100 seconds
	tokenRefreshThresholdSeconds := 100

	// And given the clock is past the token expiry
	timeNow, _err := time.Parse(time.RFC3339, "2020-01-23T12:00:00.001Z")
	if _err != nil {

	}
	clockMock := new(teatime.ClockMock)
	clockMock.On("Now", mock.Anything).Return(timeNow)

	// And given the refresh service succeeds
	tokenRefreshServiceMock := new(TokenRefreshServiceMock)
	refreshedToken := &models.Token{
		Id:           tokenId,
		Owner:        "owner-123",
		Token:        "token-value-456",
		ExpiresAfter: "2020-02-11T12:00:00.000Z",
	}
	tokenRefreshServiceMock.On("RefreshToken", mockToken).Return(refreshedToken, nil)

	// And given the token repo accepts saving the refreshed token
	tokenRepoMock.On("Set", tokenId, refreshedToken).Return(nil)

	// And given we create the service
	tokenService := new(RefreshingTokenService)
	tokenService.tokenRefreshService = tokenRefreshServiceMock
	tokenService.tokenRepository = tokenRepoMock
	tokenService.tokenRefreshThresholdSeconds = tokenRefreshThresholdSeconds
	tokenService.clock = clockMock
	tokenService.logger = new(logging.LoggerMock)

	// When we call the service
	result, err := tokenService.GetTokenById(tokenId)

	// There is no error
	assert.Nil(t, err)

	// And the result is the refreshed token
	assert.Equal(t, refreshedToken, result)
}

func TestRefreshesTheTokenWhenCloseToExpiringAndStillReturnsTokenIfRefreshingFails(t *testing.T) {
	// Given the token id
	tokenId := "token123"

	// And given the token repo returns a token
	mockTokenRepo := new(repositories.TokenRepositoryMock)
	mockToken := &models.Token{
		Id:           tokenId,
		Owner:        "owner-123",
		Token:        "token-value-123",
		ExpiresAfter: "2020-01-23T12:00:00.000Z",
	}
	mockTokenRepo.On("Get", tokenId).Return(mockToken, nil)

	// And given the time difference thresold is 100 seconds
	tokenRefreshThresholdSeconds := 100

	// And given the clock is within the threshold of the token expiry
	timeNow, _err := time.Parse(time.RFC3339, "2020-01-22T11:59:00.000Z")
	if _err != nil {

	}
	clockMock := new(teatime.ClockMock)
	clockMock.On("Now", mock.Anything).Return(timeNow)

	// And given the refresh service fails to refresh the token
	tokenRefreshServiceMock := new(TokenRefreshServiceMock)
	refreshErr := errors.New("Failed to refresh token.")
	tokenRefreshServiceMock.On("RefreshToken", mockToken).Return(nil, refreshErr)

	// And we do not expect the repo Set to be called

	// And given we create the service
	tokenService := new(RefreshingTokenService)
	tokenService.tokenRefreshService = tokenRefreshServiceMock
	tokenService.tokenRepository = mockTokenRepo
	tokenService.tokenRefreshThresholdSeconds = tokenRefreshThresholdSeconds
	tokenService.clock = clockMock
	tokenService.logger = new(logging.LoggerMock)

	// When we call the service
	result, err := tokenService.GetTokenById(tokenId)

	// There is no error
	assert.Nil(t, err)

	// It's the same token
	assert.Equal(t, mockToken, result)
}
