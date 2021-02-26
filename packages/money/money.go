package money

import (
	"github.com/juju/errors"
)

type Currency string

const (
	GBP Currency = "GBP"
)

type MonetaryAmount struct {
	Value    float32  `dynamodbav:value`
	Currency Currency `dynamodbav:currency`
}

type TransactionDirection string

const (
	CREDIT TransactionDirection = "CREDIT"
	DEBIT                       = "DEBIT"
)

func (m MonetaryAmount) Mult(n MonetaryAmount) (*MonetaryAmount, error) {
	if m.Currency != n.Currency {
		return nil, errors.New("Cannot multiply values in different currencies")
	}

	newValue := new(MonetaryAmount)
	newValue.Currency = m.Currency
	newValue.Value = m.Value * n.Value

	return newValue, nil
}
