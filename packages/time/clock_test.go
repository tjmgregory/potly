package time

import (
	"testing"
	"time"
)

func TestSystemClockNowCallsTimeNow(t *testing.T) {
	// Given the current time
	currentTime := time.Now()
	mockFunc := func() time.Time {
		return currentTime
	}

	// And we build the clock
	clock := new(SystemClock)
	clock.getTime = mockFunc

	// When we get the time
	result := clock.Now()

	// It is the mocked time
	if result != currentTime {
		t.Error("Incorrect time returned.", result, currentTime)
	}
}
