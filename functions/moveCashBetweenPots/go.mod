module theodo.red/creditcompanion/functions/moveCashBetweenPots

go 1.15

replace theodo.red/creditcompanion/packages/clients => ../../packages/clients

replace theodo.red/creditcompanion/packages/credtrack => ../../packages/credtrack

replace theodo.red/creditcompanion/packages/database => ../../packages/database

replace theodo.red/creditcompanion/packages/logging => ../../packages/logging

replace theodo.red/creditcompanion/packages/teatime => ../../packages/teatime

replace theodo.red/creditcompanion/packages/money => ../../packages/money

replace theodo.red/creditcompanion/packages/pot => ../../packages/pot

replace theodo.red/creditcompanion/packages/tokens => ../../packages/tokens

require (
	github.com/aws/aws-lambda-go v1.20.0
	github.com/aws/aws-sdk-go v1.37.10
	github.com/juju/errors v0.0.0-20200330140219-3fe23663418f
	github.com/stretchr/testify v1.7.0
	theodo.red/creditcompanion/packages/clients v1.0.0
	theodo.red/creditcompanion/packages/credtrack v1.0.0
	theodo.red/creditcompanion/packages/database v1.0.0
	theodo.red/creditcompanion/packages/logging v1.0.0
	theodo.red/creditcompanion/packages/money v1.0.0
	theodo.red/creditcompanion/packages/pot v1.0.0
	theodo.red/creditcompanion/packages/tokens v1.0.0
)
