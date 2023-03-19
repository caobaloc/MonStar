package utils

import (
	"bytes"
	"crypto/tls"
	"errors"
	"html/template"
	"os"
	"path/filepath"

	"github.com/k3a/html2text"
	"gitlab.com/ducanhng.dev/insgo-server/pkg/shared/configs/smtp"
	"gopkg.in/gomail.v2"
)

type EmailData struct {
	URL      string
	Username string
	Subject  string
}

// ? Email template parser

func ParseTemplateDir(dir string) (*template.Template, error) {
	var paths []string
	err := filepath.Walk(dir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() {
			paths = append(paths, path)
		}
		return nil
	})

	if err != nil {
		return nil, err
	}

	return template.ParseFiles(paths...)
}

func SendEmail(email string, templatesPath string, data *EmailData) error {
	config, err := smtp.LoadConfig()

	if err != nil {
		return errors.New("could not load config")
	}

	// Sender data.
	from := config.EmailFrom
	smtpPass := config.SMTPPass
	smtpUser := config.SMTPUser
	to := email
	smtpHost := config.SMTPHost
	smtpPort := config.SMTPPort

	var body bytes.Buffer

	template, err := ParseTemplateDir("templates")
	if err != nil {
		return errors.New("could not parse template")
	}

	if err := template.ExecuteTemplate(&body, templatesPath, &data); err != nil {
		return err
	}

	m := gomail.NewMessage()

	m.SetHeader("From", from)
	m.SetHeader("To", to)
	m.SetHeader("Subject", data.Subject)
	m.SetBody("text/html", body.String())
	m.AddAlternative("text/plain", html2text.HTML2Text(body.String()))

	d := gomail.NewDialer(smtpHost, smtpPort, smtpUser, smtpPass)
	d.TLSConfig = &tls.Config{
		InsecureSkipVerify: true,
	}

	// Send Email
	if err := d.DialAndSend(m); err != nil {
		return errors.New("Could not send email. Err: " + err.Error())
	}

	return nil
}
