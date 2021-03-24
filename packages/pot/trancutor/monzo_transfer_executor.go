package trancutor

import (
	"fmt"

	"theodo.red/creditcompanion/packages/money"
	"theodo.red/creditcompanion/packages/tokens"
)

func MonzoPotTransferExecutor(accessToken tokens.Token, direction money.TransactionDirection, amount money.MonetaryAmount, idempotencyKey string) error {
	fmt.Printf("Attempting to make a Monzo pot transfer! token: %v, direction: %v, amount: %v, idempotencyKey: %v", accessToken, direction, amount, idempotencyKey)
	return nil
}
