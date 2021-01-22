module theodo.red/creditcompanion/packages/tokens

go 1.15

replace theodo.red/creditcompanion/packages/teatime => ../teatime

replace theodo.red/creditcompanion/packages/logging => ../logging

require (
	github.com/aws/aws-sdk-go v1.36.19
	github.com/juju/errors v0.0.0-20200330140219-3fe23663418f
	github.com/juju/testing v0.0.0-20201216035041-2be42bba85f3 // indirect
	github.com/stretchr/testify v1.6.1
	theodo.red/creditcompanion/packages/logging v1.0.0
	theodo.red/creditcompanion/packages/teatime v1.0.0
)
