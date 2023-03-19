package utils

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

var (
	password = "mypassword"
)

func TestHashPassword(t *testing.T) {
	_, err := HashPassword(password)
	assert.Nil(t, err)
}

func TestCheckPasswordHash(t *testing.T) {
	hashedPassword, _ := HashPassword(password)
	received := CheckPasswordHash(password, hashedPassword)
	assert.True(t, received)
}
