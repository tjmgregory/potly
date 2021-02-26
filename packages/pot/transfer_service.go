package pot

import (
	"theodo.red/creditcompanion/packages/money"
)

type PotTransferService interface {
	TransferCash(potId string, requestorId string, direction money.TransactionDirection, amount money.MonetaryAmount) error
}
