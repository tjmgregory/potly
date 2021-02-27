package pot

import (
	"theodo.red/creditcompanion/packages/money"
	"theodo.red/creditcompanion/packages/tokens/tokrepo"
)

type PotTransferService interface {
	TransferCash(potId string, requestorId string, direction money.TransactionDirection, amount money.MonetaryAmount) error
}

type BasePotTransferService struct {
	potRepo   PotRepository
	tokenRepo tokrepo.TokenRepository
}
