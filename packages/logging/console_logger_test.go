package logging

func ExampleDebug() {
	logger := new(ConsoleLogger)
	one := 1
	two := "two"
	logger.Debug("1: %v, 2: %v", one, two)
	// Output: [DEBUG] 1: 1, 2: two
}

func ExampleInfo() {
	logger := new(ConsoleLogger)
	type testType struct {
		key1 string
		key2 struct {
			nestedKey int
		}
	}

	one := testType{}
	one.key1 = "value1"
	one.key2.nestedKey = 2

	logger.Info("Our value: %v", one)
	// Output: [INFO] Our value: {value1 {2}}
}

func ExampleWarn() {
	logger := new(ConsoleLogger)
	logger.Warn("Test log")
	// Output: [WARNING] Test log
}

func ExampleError() {
	logger := new(ConsoleLogger)
	logger.Error("Test log")
	// Output: [ERROR] Test log
}
