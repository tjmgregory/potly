package logging

func ExampleLogDebug() {
	logger := new(Logger)
	logger.LogDebug("Test log")
	// Output: [DEBUG] Test log
}

func ExampleLogInfo() {
	logger := new(Logger)
	logger.LogInfo("Test log")
	// Output: [INFO] Test log
}

func ExampleLogWarning() {
	logger := new(Logger)
	logger.LogWarning("Test log")
	// Output: [WARNING] Test log
}

func ExampleLogError() {
	logger := new(Logger)
	logger.LogError("Test log")
	// Output: [ERROR] Test log
}
