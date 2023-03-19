package usecases

import (
	"encoding/base64"
	"errors"
	"strings"
	"time"

	"github.com/thanhpk/randstr"
	"gitlab.com/ducanhng.dev/insgo-server/internal/pkg/domains/interfaces"
	"gitlab.com/ducanhng.dev/insgo-server/internal/pkg/domains/models/dtos"
	"gitlab.com/ducanhng.dev/insgo-server/internal/pkg/domains/models/entities"
	"gitlab.com/ducanhng.dev/insgo-server/pkg/shared/auth"
	"gitlab.com/ducanhng.dev/insgo-server/pkg/shared/configs/smtp"
	"gitlab.com/ducanhng.dev/insgo-server/pkg/shared/utils"
)

const (
	mailVerifyAccountTemplatePath = "mail_verify_account.html"
	mailResetPasswordTemplatePath = "mail_reset_password.html"
)

type userUsecase struct {
	userRepo interfaces.UserRepository
}

func NewUserUsecase(u interfaces.UserRepository) interfaces.UserUsecase {
	return &userUsecase{
		userRepo: u,
	}
}

func (uc *userUsecase) Find() ([]entities.User, error) {
	users, err := uc.userRepo.Find()
	return users, err
}

func (uc *userUsecase) Login(userReq *dtos.LogInUser) (string, error) {
	user, err := uc.userRepo.TakeByConditions(map[string]interface{}{
		"username": userReq.Username,
	})
	if err != nil {
		return "", err
	}

	if ok := utils.CheckPasswordHash(userReq.Password, user.Password); !ok {
		return "", errors.New("password is wrong")
	}

	if !user.IsVerified {
		return "", errors.New("user is not verified")
	}

	token, err := auth.GenerateJWT(userReq.Username)
	if err != nil {
		return "", err
	}

	return token, nil
}

func (uc *userUsecase) CreateByConditionsFromDto(userReq dtos.RegisterUser) (*entities.User, error) {
	if userReq.Password != userReq.PasswordConfirm {
		return nil, errors.New("password is not the same")
	}

	password, err := utils.HashPassword(userReq.Password)
	if err != nil {
		return nil, err
	}

	// gen verify code
	verifyCode := utils.Encode(randstr.String(20))

	userReq.VerificationCode = verifyCode
	userReq.IsVerified = false

	user := entities.User{
		FirstName:        userReq.FirstName,
		LastName:         userReq.LastName,
		Username:         userReq.Username,
		Email:            strings.ToLower(userReq.Email),
		Password:         password,
		IsVerified:       userReq.IsVerified,
		VerificationCode: userReq.VerificationCode,
	}

	userCreated, err := uc.userRepo.Create(user)
	if err != nil {
		return nil, err
	}

	// load config
	config, err := smtp.LoadConfig()
	if err != nil {
		return nil, err
	}

	emailData := utils.EmailData{
		URL:      config.ClientOrigin + "/auth/verify_email/" + verifyCode,
		Username: userReq.Username,
		Subject:  "InsGo verification email",
	}

	if err := utils.SendEmail(userReq.Email, mailVerifyAccountTemplatePath, &emailData); err != nil {
		if err != nil {
			return nil, err
		}
	}

	return userCreated, nil
}

func (uc *userUsecase) TakeByID(id int) (entities.User, error) {
	user, err := uc.userRepo.TakeByID(id)
	return user, err
}

func (uc *userUsecase) TakeByUsername(username string) (*entities.User, error) {
	return uc.userRepo.TakeByUsername(username)
}

func (uc *userUsecase) TakeByConditions(conditions map[string]interface{}) (*entities.User, error) {
	return uc.userRepo.TakeByConditions(conditions)
}

func (uc *userUsecase) VerifyEmail(code string) error {
	updatedUser, err := uc.userRepo.TakeByConditions(map[string]interface{}{
		"verification_code": code,
	})
	if err != nil {
		return err
	}

	if updatedUser.IsVerified {
		return errors.New("user is already verified")
	}

	updatedUser.VerificationCode = ""
	updatedUser.IsVerified = true
	updatedUser.EmailVerifiedAt = time.Now()

	if err := uc.userRepo.Update(updatedUser); err != nil {
		return err
	}

	return nil
}

func (uc *userUsecase) SendMailForgotPassword(req *dtos.ForgotPasswordRequest) error {
	user, err := uc.userRepo.TakeByConditions(map[string]interface{}{
		"email": req.Email,
	})
	if err != nil {
		return err
	}

	if !user.IsVerified {
		return errors.New("user is not verified")
	}

	encodedEmail := base64.StdEncoding.EncodeToString([]byte(user.Email))

	token, err := auth.GenerateJWT(user.Username)
	if err != nil {
		return err
	}

	config, err := smtp.LoadConfig()
	if err != nil {
		return err
	}

	emailData := utils.EmailData{
		URL:      config.ClientOrigin + "/auth/reset_password/" + encodedEmail + "/" + token,
		Username: user.Username,
		Subject:  "InsGo reset password email",
	}

	if err := utils.SendEmail(user.Email, mailResetPasswordTemplatePath, &emailData); err != nil {
		return err
	}

	return err
}

func (uc *userUsecase) ResetPassword(username string, req dtos.ResetPasswordRequest) error {
	user, err := uc.userRepo.TakeByConditions(map[string]interface{}{
		"username": username,
	})
	if err != nil {
		return err
	}

	if !user.IsVerified {
		return errors.New("your account is not verified")
	}

	newHashPassword, err := utils.HashPassword(req.NewPassword)
	if err != nil {
		return errors.New("error while hash password")
	}

	user.Password = newHashPassword
	if err := uc.userRepo.Update(user); err != nil {
		return err
	}

	return nil
}

func (uc *userUsecase) FollowUser(currentUsername string, friendUsername string) (*int, error) {
	usernames := []string{currentUsername, friendUsername}
	users, err := uc.userRepo.FindByConditions(map[string]interface{}{
		"username": usernames,
	})
	if err != nil {
		return nil, err
	}

	currentUser := entities.User{}
	friendUser := entities.User{}
	for _, user := range users {
		if user.Username == currentUsername {
			currentUser = user
		} else if user.Username == friendUsername {
			friendUser = user
		}
	}

	if err := uc.userRepo.AppendAssociationFriend(&currentUser, &friendUser); err != nil {
		return nil, err
	}

	return &currentUser.ID, nil
}

func (uc *userUsecase) UnFollowUser(currentUsername string, friendUsername string) (*int, error) {
	currentUser, err := uc.userRepo.TakeByConditions(map[string]interface{}{
		"username": currentUsername,
	})
	if err != nil {
		return nil, err
	}

	friendUser, err := uc.userRepo.TakeByConditions(map[string]interface{}{
		"username": friendUsername,
	})
	if err != nil {
		return nil, err
	}

	if err := uc.userRepo.AppendAssociationFriend(currentUser, friendUser); err != nil {
		return nil, err
	}

	return &currentUser.ID, nil
}
