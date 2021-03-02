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

// const defaultLogger ConsoleLogger{}

func (l *ConsoleLogger) log(level LogLevel, format string, args ...interface{}) {
	logType := map[LogLevel]string{
		DEBUG:   "[DEBUG]",
		WARNING: "[WARNING]",
		ERROR:   "[ERROR]",
		INFO:    "[INFO]",
	}[level]

	fmt.Printf(logType+" "+format+"\n", args)
}

func (l *ConsoleLogger) Debug(format string, args ...interface{}) {
	l.log(DEBUG, format, args...)
}

// func Debug(format string, args ...interface{}) {
//     defaultLogger.log(DEBUG, format, args...)
// }

func (l *ConsoleLogger) Info(format string, args ...interface{}) {
	l.log(INFO, format, args...)
}

func (l *ConsoleLogger) Warning(format string, args ...interface{}) {
	l.log(WARNING, format, args...)
}

func (l *ConsoleLogger) Error(format string, args ...interface{}) {
	l.log(ERROR, format, args...)
}

func NewConsoleLogger() Logger {
	return new(ConsoleLogger)
}
