package pot

import (
	"github.com/stretchr/testify/mock"
	"theodo.red/creditcompanion/packages/money"
)

type PotTransferServiceMock struct {
	mock.Mock
}

func (p *PotTransferServiceMock) TransferCash(potId string, requestorId string, direction money.TransactionDirection, amount money.MonetaryAmount, idempotencyKey string) error {
	args := p.Called(potId, requestorId, direction, amount, idempotencyKey)
	return args.Error(0)
}

func NewPotTransferServiceMock() PotTransferService {
	return new(PotTransferServiceMock)
}
