package logging

import (
	"fmt"
)

// LogLevel is an enum-like type that we can use to designate the log level
type LogLevel int

const (
	DEBUG = iota
	INFO
	WARNING
	ERROR
)

// ConsoleLogger is a base struct that could eventually maintain connections to something like bugsnag or logging tools
type ConsoleLogger struct{}

// log is a private function that manages the internal logic about what and how to log data depending on the log level
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
