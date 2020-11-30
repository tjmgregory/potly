package main

import (
	"testing"

	"theodo.red/creditcompanion/packages/logging"
)

func TestAbs(t *testing.T) {
	got := 1
	if got != 1 {
		t.Errorf("got = %d; want 1", got)
	}

	logger := new(logging.Logger)
	logger.LogDebug("Test log")
}
