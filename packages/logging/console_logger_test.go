package logging

func ExampleLogDebug() {
	logger := new(ConsoleLogger)
	logger.LogDebug("Test log")
	// Output: [DEBUG] Test log
}

func ExampleLogInfo() {
	logger := new(ConsoleLogger)
	logger.LogInfo("Test log")
	// Output: [INFO] Test log
}

func ExampleLogWarning() {
	logger := new(ConsoleLogger)
	logger.LogWarning("Test log")
	// Output: [WARNING] Test log
}

func ExampleLogError() {
	logger := new(ConsoleLogger)
	logger.LogError("Test log")
	// Output: [ERROR] Test log
}
