package tokens

import (
	"time"

	"github.com/juju/errors"
)

type Token struct {
	Id           string
	Owner        string
	Token        string
	ExpiresAfter string
}

func (t *Token) ExpiresAfterTime() time.Time {
	parsedModelTime, err := time.Parse(time.RFC3339, t.ExpiresAfter)
	if err != nil {
		errors.New("Could not parse token expiry date: " + t.ExpiresAfter)
	}
	return parsedModelTime
}
