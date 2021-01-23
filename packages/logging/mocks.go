package logging

import "github.com/stretchr/testify/mock"

type LoggerMock struct {
	mock.Mock
}

func (m *LoggerMock) LogDebug(input ...interface{}) {
	m.Called(input)
}

func (m *LoggerMock) LogInfo(input ...interface{}) {
	m.Called(input)
}

func (m *LoggerMock) LogWarning(input ...interface{}) {
	m.Called(input)
}

func (m *LoggerMock) LogError(input ...interface{}) {
	m.Called(input)
}

func testInterfaceInheritance() Logger {
	return new(LoggerMock)
}
