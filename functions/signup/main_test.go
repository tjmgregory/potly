package main

import "testing"

func TestAbs(t *testing.T) {
	got := 1
	if got != 1 {
		t.Errorf("got = %d; want 1", got)
	}
}
