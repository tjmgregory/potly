package pot

type PotProvider string

const (
	MONZO PotProvider = "MONZO"
)

type Pot struct {
	id            string
	registeredBy  string
	accessTokenId string
	createdAt     string // ISO timestamp
	potProvider   PotProvider
}
