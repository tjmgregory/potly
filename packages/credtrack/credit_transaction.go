package credtrack

type Currency string

const (
	GBP Currency = "GBP"
)

type MonetaryAmount struct {
	Value    float32  `dynamodbav:value`
	Currency Currency `dynamodbav:currency`
}

type TransactionType string

const (
	CREDIT TransactionType = "CREDIT"
	DEBIT                  = "DEBIT"
)

type CreditTransaction struct {
	Id              string             `dynamodbav:id`
	CreditSource    string             `dynamodbav:creditSource`
	CreatedAt       string             `dynamodbav:createdAt`
	LinkedClients   map[string]float32 `dynamodbav:linkedClients`
	Total           MonetaryAmount     `dynamodbav:total`
	TransactionType TransactionType    `dynamodbav:transactionType`
	Description     string             `dynamodbav:description`
	TransactedAt    string             `dynamodbav:transactedAt`
}
