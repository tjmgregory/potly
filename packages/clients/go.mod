module theodo.red/creditcompanion/packages/clients

go 1.15

replace theodo.red/creditcompanion/packages/teatime => ../teatime

replace theodo.red/creditcompanion/packages/logging => ../logging

replace theodo.red/creditcompanion/packages/database => ../database

require (
	github.com/juju/errors v0.0.0-20200330140219-3fe23663418f
	github.com/stretchr/testify v1.7.0
	theodo.red/creditcompanion/packages/database v1.0.0
	theodo.red/creditcompanion/packages/logging v1.0.0
	theodo.red/creditcompanion/packages/teatime v1.0.0
)
