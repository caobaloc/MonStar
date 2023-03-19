package smtp

import (
	"errors"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type SMTPConfig struct {
	EmailFrom string `mapstructure:"EMAIL_FROM"`
	SMTPHost  string `mapstructure:"SMTP_HOST"`
	SMTPPass  string `mapstructure:"SMTP_PASS"`
	SMTPPort  int    `mapstructure:"SMTP_PORT"`
	SMTPUser  string `mapstructure:"SMTP_USER"`

	ClientOrigin string `mapstructure:"CLIENT_ORIGIN"`
}

// NewSMTP initialize
func LoadConfig() (config SMTPConfig, err error) {
	if err := godotenv.Load(".env"); err != nil {
		return config, errors.New("Some error occured. Err: " + err.Error())
	}

	port, _ := strconv.Atoi(os.Getenv("SMTP_PORT"))

	smtp := SMTPConfig{
		EmailFrom:    os.Getenv("EMAIL_FROM"),
		SMTPHost:     os.Getenv("SMTP_HOST"),
		SMTPPass:     os.Getenv("SMTP_PASS"),
		SMTPPort:     port,
		SMTPUser:     os.Getenv("SMTP_USER"),
		ClientOrigin: os.Getenv("CLIENT_ORIGIN"),
	}

	return smtp, nil
}
