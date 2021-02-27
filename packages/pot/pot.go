package pot

type PotProvider string

const (
	MONZO PotProvider = "MONZO"
)

type Pot struct {
	id            string      `dynamodbav:id`
	registeredBy  string      `dynamodbav:registeredBy`
	accessTokenId string      `dynamodbav:accessTokenId`
	createdAt     string      `dynamodbav:createdAt`
	potProvider   PotProvider `dynamodbav:potProvider`
}
