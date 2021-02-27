package trancutor

import (
	"theodo.red/creditcompanion/packages/money"
	"theodo.red/creditcompanion/packages/tokens"
)

type PotTransferExecutor func(accessToken tokens.Token, direction money.TransactionDirection, amount money.MonetaryAmount, idempotencyKey string) error
