package pot

import (
	"github.com/juju/errors"

	"theodo.red/creditcompanion/packages/money"
	"theodo.red/creditcompanion/packages/tokens"
	"theodo.red/creditcompanion/packages/tokens/tokserv"
)

type PotTransferService interface {
	TransferCash(potId string, requestorId string, direction money.TransactionDirection, amount money.MonetaryAmount) error
}

type BasePotTransferService struct {
	potRepo   PotRepository
	tokenRepo tokserv.TokenService
}

type PotTransferExecutor func(accessToken tokens.Token, direction money.TransactionDirection, amount money.MonetaryAmount) error

var potTransferMap = map[PotProvider]PotTransferExecutor{
	MONZO: MonzoPotTransferExecutor,
}

func (p *BasePotTransferService) TransferCash(potId string, requestorId string, direction money.TransactionDirection, amount money.MonetaryAmount) error {
	pot, err := p.potRepo.Get(potId)
	if err != nil {
		return errors.Annotatef(err, "Failed to find pot %v", potId)
	}

	if pot.registeredBy != requestorId {
		return errors.Errorf("Requestor %v who did not create pot %v attempted perform operations upon it.", requestorId, potId)
	}

	token, err := p.tokenRepo.GetTokenById(pot.accessTokenId)
	if err != nil {
		return errors.Annotatef(err, "Failed to find token %v for pot %v", pot.accessTokenId, potId)
	}

	return potTransferMap[pot.potProvider](*token, direction, amount)
}

func MonzoPotTransferExecutor(accessToken tokens.Token, direction money.TransactionDirection, amount money.MonetaryAmount) error {
	return nil
}
