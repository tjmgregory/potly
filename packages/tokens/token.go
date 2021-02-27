package tokens

import (
	"time"

	"github.com/juju/errors"
)

type Token struct {
	Id           string `dynamodbav:id`
	Owner        string `dynamodbav:owner`
	Token        string `dynamodbav:token`
	ExpiresAfter string `dynamodbav:expiresAfter`
}

func (t *Token) ExpiresAfterTime() time.Time {
	parsedModelTime, err := time.Parse(time.RFC3339, t.ExpiresAfter)
	if err != nil {
		errors.New("Could not parse token expiry date: " + t.ExpiresAfter)
	}
	return parsedModelTime
}
