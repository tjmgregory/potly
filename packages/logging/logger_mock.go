package logging

import "github.com/stretchr/testify/mock"

type LoggerMock struct {
	mock.Mock
}

func (m *LoggerMock) Debug(format string, args ...interface{}) {
	m.Called(format, args)
}

func (m *LoggerMock) Info(format string, args ...interface{}) {
	m.Called(format, args)
}

func (m *LoggerMock) Warning(format string, args ...interface{}) {
	m.Called(format, args)
}

func (m *LoggerMock) Error(format string, args ...interface{}) {
	m.Called(format, args)
}

func testInterfaceInheritance() Logger {
	return new(LoggerMock)
}
