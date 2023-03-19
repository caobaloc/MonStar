package validator

import (
	"regexp"

	"github.com/gin-gonic/gin/binding"
	v "github.com/go-playground/validator/v10"
)

func New() *v.Validate {
	validate, ok := binding.Validator.Engine().(*v.Validate)
	if !ok {
		return nil
	}

	_ = validate.RegisterValidation("alphaNumeric", IsAlphaNumericType)

	return validate
}

func isPasswordValid(s string) bool {
	hasMinLength := regexp.MustCompile(`.{8,10}`)
	hasLower := regexp.MustCompile(`[a-z]`)
	hasUpper := regexp.MustCompile(`[A-Z]`)
	hasDigit := regexp.MustCompile(`[0-9]`)
	hasSymbol := regexp.MustCompile(`[!@#$%^&*()]`)
	hasAll := regexp.MustCompile(`^[0-9a-zA-Z!@#$%^&*()]*$`)
	return hasDigit.MatchString(s) && hasLower.MatchString(s) && hasUpper.MatchString(s) && hasSymbol.MatchString(s) && hasAll.MatchString(s) && hasMinLength.MatchString(s)
}
