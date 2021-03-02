package logging

func ExampleDebug() {
	logger := new(ConsoleLogger)
	logger.Debug("Test log")
	// Output: [DEBUG] Test log
}

func ExampleInfo() {
	logger := new(ConsoleLogger)
	logger.Info("Test log")
	// Output: [INFO] Test log
}

func ExampleWarning() {
	logger := new(ConsoleLogger)
	logger.Warning("Test log")
	// Output: [WARNING] Test log
}

func ExampleError() {
	logger := new(ConsoleLogger)
	logger.Error("Test log")
	// Output: [ERROR] Test log
}
