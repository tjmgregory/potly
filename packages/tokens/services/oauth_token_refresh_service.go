package services

import (
	"theodo.red/creditcompanion/packages/tokens/models"
)

type TokenRefreshService interface {
	RefreshToken(*models.Token) (*models.Token, error)
}

type DummyTokenRefreshService struct{}

func (*DummyTokenRefreshService) RefreshToken(token *models.Token) (*models.Token, error) {
	return token, nil
}
