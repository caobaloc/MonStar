package auth

import (
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

func GenerateJWT(username string) (string, error) {
	claims := jwt.MapClaims{}
	claims["user"] = username
	claims["aud"] = "insgo-server.jwtgo.io"
	claims["iss"] = "jwtgo.io"
	//exp = 24 hours
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()
	claims["authorized"] = true

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(os.Getenv("JWT_KEY")))
}

func CheckJWT(token string) error {
	t, err := jwt.Parse(token, func(tkn *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_KEY")), nil
	})
	if err != nil {
		return err
	} else if !t.Valid {
		err = errors.New("invalid token")
		return err
	} else if t.Claims.(jwt.MapClaims)["aud"] != "go-social.jwtgo.io" {
		err = errors.New("invalid aud")
		return err
	} else if t.Claims.(jwt.MapClaims)["iss"] != "jwtgo.io" {
		err = errors.New("invalid iss")
		return err
	}

	return nil
}

func ValidateJWT(token string) (interface{}, error) {
	tok, err := jwt.Parse(token, func(jwtToken *jwt.Token) (interface{}, error) {
		if _, ok := jwtToken.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected method: %s", jwtToken.Header["alg"])
		}
		return []byte(os.Getenv("JWT_KEY")), nil
	})
	if err != nil {
		return nil, fmt.Errorf("invalidate token: %w", err)
	}

	claims, ok := tok.Claims.(jwt.MapClaims)
	if !ok || !tok.Valid {
		return nil, fmt.Errorf("invalid token claim")
	}

	return claims["user"], nil
}

func VerifyJWT(tokenString string) bool {
	// Parse the token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_KEY")), nil
	})
	if err != nil {
		return false
	}

	return token.Valid
}
