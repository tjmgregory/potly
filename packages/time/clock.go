package time

import "time"

type Clock interface {
	Now() time.Time
}

type SystemClock struct {
	getTime func() time.Time
}

func (c *SystemClock) Now() time.Time {
	return c.getTime()
}

func NewSystemClock() Clock {
	clock := new(SystemClock)
	clock.getTime = time.Now

	return clock
}
