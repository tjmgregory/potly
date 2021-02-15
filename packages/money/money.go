package money

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
