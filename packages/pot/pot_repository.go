package pot

import (
	"github.com/juju/errors"
	"theodo.red/creditcompanion/packages/database"
	"theodo.red/creditcompanion/packages/database/marsh"
	"theodo.red/creditcompanion/packages/database/tdynamo"
)

type PotRepository interface {
	Get(id string) (*Pot, error)
}

type PotDBRepository struct {
	repo database.Repository
}

func (p *PotDBRepository) Get(id string) (*Pot, error) {
	pot := new(Pot)
	if err := p.repo.GetByUniqueField("id", id, pot); err != nil {
		return nil, errors.Annotatef(err, "Call to repo failed. Pot id: %v", id)
	}
	return pot, nil
}

func NewDynamoPotRepository(db tdynamo.DynamoDbInterface) PotRepository {
	repo := new(PotDBRepository)
	marshallingRepo := marsh.NewMarshallingDynamoRepository(db, "pots")
	repo.repo = marshallingRepo

	return repo
}
