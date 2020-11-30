package logging

import (
	"fmt"
	"time"
)

// LogLevel is an enum-like type that we can use to designate the log level
type LogLevel int

const (
	DEBUG = iota
	INFO
	WARNING
	ERROR
)

// Logger is a base struct that could eventually maintain connections to something like bugsnag or logging tools
type Logger struct{}

// log is a private function that manages the internal logic about what and how to log data depending on the log level
func (l *Logger) log(level LogLevel, messages ...interface{}) {
	now := time.Now()
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
	// format the output in a somewhat friendly way
	fmt.Println("-----------------------------------------")
	fmt.Printf("%s - %s\n", logType, now)
	for _, message := range messages {
		fmt.Printf("%+v\n", message)
	}
	fmt.Println("-----------------------------------------")
}

func LogTheo(msg string) {
	fmt.Println(msg)
}

// LogDebug is a publicly exposed info log that passes the message along correctly
func (l *Logger) LogDebug(messages ...interface{}) {
	l.log(DEBUG, messages...)
}

// LogInfo is a publicly exposed info log that passes the message along correctly
func (l *Logger) LogInfo(messages ...interface{}) {
	l.log(INFO, messages...)
}

// LogWarning is a publicly exposed info log that passes the message along correctly
func (l *Logger) LogWarning(messages ...interface{}) {
	l.log(WARNING, messages...)
}

// LogError is a publicly exposed info log that passes the message along correctly
func (l *Logger) LogError(messages ...interface{}) {
	l.log(ERROR, messages...)
}
