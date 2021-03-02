package tokserv

import (
	"theodo.red/creditcompanion/packages/database/tdynamo"
	"theodo.red/creditcompanion/packages/logging"
	"theodo.red/creditcompanion/packages/teatime"
	"theodo.red/creditcompanion/packages/tokens"
	"theodo.red/creditcompanion/packages/tokens/tokrepo"
)

type RefreshingTokenService struct {
	tokenRefreshService          TokenRefreshService
	tokenRepository              tokrepo.TokenRepository
	tokenRefreshThresholdSeconds int
	clock                        teatime.Clock
	logger                       logging.Logger
}

func (r *RefreshingTokenService) GetTokenById(id string) (*tokens.Token, error) {
	token, err := r.tokenRepository.Get(id)
	if err != nil {
		return nil, err
	}

	if r.tokenIsCloseToOrHasExpired(token) {
		refreshedToken, refreshErr := r.tokenRefreshService.RefreshToken(token)
		if refreshErr != nil {
			if r.tokenIsActive(token) {
				r.logger.Debug("Token %v is near to expiry yet refresh failed. Continuing anyway, the request may fail.", token.Id)
			} else {
				return nil, refreshErr
			}
		} else {
			setErr := r.tokenRepository.Set(token.Id, refreshedToken)
			if setErr != nil {
				// TODO: Turns out returning a value and an error is bad practice. Consider changing in the future.
				return refreshedToken, setErr
			}
			token = refreshedToken
		}
	}

	return token, nil
}

func (r *RefreshingTokenService) tokenIsActive(token *tokens.Token) bool {
	return r.clock.Now().Before(token.ExpiresAfterTime())
}

func (r *RefreshingTokenService) tokenIsCloseToOrHasExpired(token *tokens.Token) bool {
	if !r.tokenIsActive(token) {
		return true
	}

	return (token.ExpiresAfterTime().Unix() - r.clock.Now().Unix()) < int64(r.tokenRefreshThresholdSeconds)
}

func NewRefreshingTokenService(db tdynamo.DynamoDbInterface) TokenService {
	service := new(RefreshingTokenService)
	service.tokenRefreshService = NewDummyTokenRefreshService()
	service.tokenRepository = tokrepo.NewDynamoTokenRepository(db)
	service.tokenRefreshThresholdSeconds = 30
	service.clock = teatime.NewSystemClock()
	service.logger = logging.NewConsoleLogger()

	return service
}
