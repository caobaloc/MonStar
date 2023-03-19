package validator

import (
	"strings"

	validator "github.com/go-playground/validator/v10"
	"gitlab.com/ducanhng.dev/insgo-server/pkg/shared/utils"
)

func IsAlphaNumericType(fl validator.FieldLevel) bool {
	value := fl.Field().String()

	return utils.AlphaNumericRegex.MatchString(value)
}

func Password(fl validator.FieldLevel) bool {
	password := fl.Field().String()
	return isPasswordValid(password)
}

func Enum(fl validator.FieldLevel) bool {
	enumString := fl.Param()
	value := fl.Field().String()
	enumSlice := strings.Split(enumString, "_")
	for _, v := range enumSlice {
		if value == v {
			return true
		}
	}
	return false
}
