package logging

import (
	"fmt"
)

type LogLevel int

const (
	DEBUG = iota
	INFO
	WARNING
	ERROR
)

type ConsoleLogger struct{}

func (l *ConsoleLogger) log(level LogLevel, messages ...interface{}) {
	var logType string
	switch level {
	case DEBUG:
		logType = "[DEBUG]"
		break
	case WARNING:
		logType = "[WARNING]"
		break
	case ERROR:
		logType = "[ERROR]"
		break
	default:
		logType = "[INFO]"
		break

	}
	for _, message := range messages {
		fmt.Printf("%s %s\n", logType, message)
	}
}

func (l *ConsoleLogger) LogDebug(messages ...interface{}) {
	l.log(DEBUG, messages...)
}

func (l *ConsoleLogger) LogInfo(messages ...interface{}) {
	l.log(INFO, messages...)
}

func (l *ConsoleLogger) LogWarning(messages ...interface{}) {
	l.log(WARNING, messages...)
}

func (l *ConsoleLogger) LogError(messages ...interface{}) {
	l.log(ERROR, messages...)
}

func NewConsoleLogger() Logger {
	return new(ConsoleLogger)
}
