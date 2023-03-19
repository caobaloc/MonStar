package utils

import "regexp"

const (
	alphaNumericRegexString string = `^[a-zA-Z0-9]+$`
)

var (
	AlphaNumericRegex = regexp.MustCompile(alphaNumericRegexString)
)
