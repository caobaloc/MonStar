package dtos

import (
	"time"

	_ "github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

type LogInUser struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required,Password"`
}

type RegisterUser struct {
	FirstName        string `json:"first_name"`
	LastName         string `json:"last_name"`
	Username         string `json:"username" binding:"required"`
	Email            string `json:"email" binding:"required,email"`
	Gender           string `json:"gender" binding:"required,Enum=male_female_custom"`
	Password         string `json:"password" binding:"Password,required"`
	PasswordConfirm  string `json:"password_confirm" binding:"Password,required"`
	VerificationCode string
	IsVerified       bool
}

type ForgotPasswordRequest struct {
	Email string `json:"email" binding:"email,required"`
}

type ResetPasswordRequest struct {
	NewPassword        string `json:"new_password" binding:"required"`
	ConfirmNewPassword string `json:"confirm_new_password" binding:"required"`
}

type UserResponse struct {
	FirstName   string         `json:"first_name"`
	LastName    string         `json:"last_name"`
	Username    string         `json:"username"`
	AvatarUrl   string         `json:"avatar_url"`
	Bio         string         `json:"string"`
	Email       string         `json:"email"`
	PhoneNumber string         `json:"phone_number"`
	Gender      string         `json:"gender"`
	IsVerified  bool           `json:"is_verified"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"deleted_at,omitempty"`
}
