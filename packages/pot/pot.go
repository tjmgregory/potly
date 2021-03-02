package pot

type PotProvider string

const (
	MONZO PotProvider = "MONZO"
)

type Pot struct {
	AccessTokenId string      `dynamodbav:"accessTokenId"`
	CreatedAt     string      `dynamodbav:"createdAt"`
	Id            string      `dynamodbav:"id"`
	PotProvider   PotProvider `dynamodbav:"potProvider"`
	RegisteredBy  string      `dynamodbav:"registeredBy"`
}
