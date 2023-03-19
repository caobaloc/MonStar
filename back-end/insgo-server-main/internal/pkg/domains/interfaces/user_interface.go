package interfaces

import (
	"gitlab.com/ducanhng.dev/insgo-server/internal/pkg/domains/models/dtos"
	"gitlab.com/ducanhng.dev/insgo-server/internal/pkg/domains/models/entities"
)

// UserUsecase interface
type UserUsecase interface {
	Find() ([]entities.User, error)
	Login(userReq *dtos.LogInUser) (string, error)
	CreateByConditionsFromDto(userReq dtos.RegisterUser) (*entities.User, error)
	TakeByID(id int) (entities.User, error)
	TakeByUsername(username string) (*entities.User, error)
	TakeByConditions(conditions map[string]interface{}) (*entities.User, error)
	VerifyEmail(code string) error
	SendMailForgotPassword(req *dtos.ForgotPasswordRequest) error
	ResetPassword(username string, req dtos.ResetPasswordRequest) error
	FollowUser(currentUsername string, friendUsername string) (*int, error)
	UnFollowUser(currentUsername string, friendUsername string) (*int, error)
}

// UserRepository interface
type UserRepository interface {
	Find() ([]entities.User, error)
	Create(user entities.User) (*entities.User, error)
	TakeByID(id int) (entities.User, error)
	TakeByUsername(username string) (*entities.User, error)
	TakeByConditions(conditions map[string]interface{}) (*entities.User, error)
	FindByConditions(conditions map[string]interface{}) ([]entities.User, error)
	Update(user *entities.User) error
	AppendAssociationFriend(user, friend *entities.User) error
	DeleteAssociationFriend(user, friend *entities.User) error
}
