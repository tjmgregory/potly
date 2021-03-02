package logging

import (
	"fmt"
)

type LogLevel int

const (
	DEBUG = iota
	INFO
	WARN
	ERROR
)

type ConsoleLogger struct{}

func (l *ConsoleLogger) log(level LogLevel, format string, args ...interface{}) {
	logType := map[LogLevel]string{
		DEBUG: "[DEBUG]",
		INFO:  "[INFO]",
		WARN:  "[WARNING]",
		ERROR: "[ERROR]",
	}[level]

	fmt.Printf(logType+" "+format+"\n", args)
}

func (l *ConsoleLogger) Debug(format string, args ...interface{}) {
	l.log(DEBUG, format, args...)
}

func (l *ConsoleLogger) Info(format string, args ...interface{}) {
	l.log(INFO, format, args...)
}

func (l *ConsoleLogger) Warn(format string, args ...interface{}) {
	l.log(WARN, format, args...)
}

func (l *ConsoleLogger) Error(format string, args ...interface{}) {
	l.log(ERROR, format, args...)
}

var defaultLogger *ConsoleLogger

func logger() *ConsoleLogger {
	if defaultLogger == nil {
		defaultLogger = new(ConsoleLogger)
	}
	return defaultLogger
}

func Debug(format string, args ...interface{}) {
	logger().Debug(format, args)
}

func Info(format string, args ...interface{}) {
	logger().Info(format, args)
}

func Warn(format string, args ...interface{}) {
	logger().Warn(format, args)
}

func Error(format string, args ...interface{}) {
	logger().Error(format, args)
}

func NewConsoleLogger() Logger {
	return new(ConsoleLogger)
}
