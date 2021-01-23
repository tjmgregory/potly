package logging

type Logger interface {
	LogDebug(...interface{})
	LogInfo(...interface{})
	LogWarning(...interface{})
	LogError(...interface{})
}
