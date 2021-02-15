package credmod

type MonetaryAmount struct {
	Value    float32  `dynamodbav:value`
	Currency Currency `dynamodbav:currency`
}
