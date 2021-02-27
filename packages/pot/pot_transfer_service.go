package pot

import (
	"./trancutor"
	"github.com/juju/errors"

	"theodo.red/creditcompanion/packages/database/tdynamo"
	"theodo.red/creditcompanion/packages/money"
	"theodo.red/creditcompanion/packages/tokens/tokserv"
)

type PotTransferService interface {
	TransferCash(potId string, requestorId string, direction money.TransactionDirection, amount money.MonetaryAmount, idempotencyKey string) error
}

type BasePotTransferService struct {
	potRepo      PotRepository
	tokenService tokserv.TokenService
}

var potTransferMap = map[PotProvider]trancutor.PotTransferExecutor{
	MONZO: trancutor.MonzoPotTransferExecutor,
}

func (p *BasePotTransferService) TransferCash(potId string, requestorId string, direction money.TransactionDirection, amount money.MonetaryAmount, idempotencyKey string) error {
	pot, err := p.potRepo.Get(potId)
	if err != nil {
		return errors.Annotatef(err, "Failed to find pot %v", potId)
	}

	if pot.registeredBy != requestorId {
		return errors.Errorf("Requestor %v who did not create pot %v attempted perform operations upon it.", requestorId, potId)
	}

	token, err := p.tokenService.GetTokenById(pot.accessTokenId)
	if err != nil {
		return errors.Annotatef(err, "Failed to find token %v for pot %v", pot.accessTokenId, potId)
	}

	return potTransferMap[pot.potProvider](*token, direction, amount, idempotencyKey)
}

func NewPotTransferService(db tdynamo.DynamoDbInterface) PotTransferService {
	service := new(BasePotTransferService)
	service.potRepo = NewDynamoPotRepository(db)
	service.tokenService = tokserv.NewRefreshingTokenService(db)

	return service
}
