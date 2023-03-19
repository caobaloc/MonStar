package handlers

import (
	"encoding/base64"
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
	"github.com/sirupsen/logrus"
	"gitlab.com/ducanhng.dev/insgo-server/internal/pkg/domains/interfaces"
	"gitlab.com/ducanhng.dev/insgo-server/internal/pkg/domains/models/dtos"
	"gitlab.com/ducanhng.dev/insgo-server/internal/pkg/domains/models/entities"
	"gitlab.com/ducanhng.dev/insgo-server/internal/pkg/domains/repositories"
	"gitlab.com/ducanhng.dev/insgo-server/internal/pkg/domains/usecases"
	"gitlab.com/ducanhng.dev/insgo-server/pkg/shared/auth"
	validate "gitlab.com/ducanhng.dev/insgo-server/pkg/shared/validator"
	"gorm.io/gorm"
)

// UserHandler struct
type UserHandler struct {
	logger      *logrus.Logger
	UserUsecase interfaces.UserUsecase
}

// NewUserHandler func
func NewUserHandler(logger *logrus.Logger, dbConn *gorm.DB) *UserHandler {
	userRepo := repositories.NewUserRepository(dbConn)
	userUsecase := usecases.NewUserUsecase(userRepo)

	return &UserHandler{
		logger:      logger,
		UserUsecase: userUsecase,
	}
}

func (uh *UserHandler) Login(c *gin.Context) {
	userReq := &dtos.LogInUser{}
	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		v.RegisterValidation("Password", validate.Password)
	}

	if err := c.ShouldBind(&userReq); err != nil {
		c.JSON(http.StatusInternalServerError, dtos.BaseResponse{
			Error: &dtos.ErrorResponse{
				ErrorMessage: err.Error(),
			},
		})
		return
	}

	token, err := uh.UserUsecase.Login(userReq)
	if err != nil {
		c.JSON(http.StatusInternalServerError, dtos.BaseResponse{
			Error: &dtos.ErrorResponse{
				ErrorMessage: err.Error(),
			},
		})
		return
	}

	c.SetCookie("token", token, 60*60*24, "/", "localhost", false, true)

	c.JSON(http.StatusOK, dtos.BaseResponse{
		Status: "success",
		Data: gin.H{
			"access_token": token,
		},
	})
}

func (uh *UserHandler) Logout(c *gin.Context) {
	c.SetCookie("token", "", -1, "/", "localhost", false, true)
	c.JSON(http.StatusOK, dtos.BaseResponse{
		Status: "success",
	})
}

func (uh *UserHandler) Register(c *gin.Context) {
	userReq := &dtos.RegisterUser{}
	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		v.RegisterValidation("Password", validate.Password)
		v.RegisterValidation("Enum", validate.Enum)
	}

	if err := c.ShouldBind(&userReq); err != nil {
		c.JSON(http.StatusInternalServerError, dtos.BaseResponse{
			Error: &dtos.ErrorResponse{
				ErrorMessage: err.Error(),
			},
		})
		return
	}

	userCreated, err := uh.UserUsecase.CreateByConditionsFromDto(*userReq)
	if err != nil {
		c.JSON(http.StatusInternalServerError, dtos.BaseResponse{
			Error: &dtos.ErrorResponse{
				ErrorMessage: err.Error(),
			},
		})
		return
	}

	c.JSON(http.StatusOK, dtos.BaseResponse{
		Status: "success",
		Data: gin.H{
			"user":    convertUserEntityToUserResponse(userCreated),
			"message": "We sent an email with a verification code to " + userCreated.Email,
		},
	})
}

func (uh *UserHandler) VerifyEmail(c *gin.Context) {
	code := c.Param("verify_code")

	if err := uh.UserUsecase.VerifyEmail(code); err != nil {
		c.JSON(http.StatusBadRequest, dtos.BaseResponse{
			Error: &dtos.ErrorResponse{
				ErrorMessage: err.Error(),
			},
		})
		return
	}

	c.JSON(http.StatusOK, dtos.BaseResponse{
		Status: "success",
		Data: gin.H{
			"message": "Email verified successfully",
		},
	})
}

func (uh *UserHandler) ResetPassword(c *gin.Context) {
	req := &dtos.ForgotPasswordRequest{}
	if err := c.ShouldBind(&req); err != nil {
		c.JSON(http.StatusBadRequest, dtos.BaseResponse{
			Status: "failed",
			Error: &dtos.ErrorResponse{
				ErrorMessage: err.Error(),
			},
		})
		return
	}

	if err := uh.UserUsecase.SendMailForgotPassword(req); err != nil {
		c.JSON(http.StatusInternalServerError, dtos.BaseResponse{
			Status: "failed",
			Error: &dtos.ErrorResponse{
				ErrorMessage: err.Error(),
			},
		})
		return
	}

	c.JSON(http.StatusOK, dtos.BaseResponse{
		Status: "success",
		Data: gin.H{
			"message": "send success",
		},
	})
}

func (uh *UserHandler) VerifyResetPasswordLink(c *gin.Context) {
	_, ok := uh.VerifyParam(c)
	if !ok {
		c.JSON(http.StatusInternalServerError, dtos.BaseResponse{
			Status: "failed",
			Error: &dtos.ErrorResponse{
				ErrorMessage: "verify param error",
			},
		})
	}

	c.JSON(http.StatusOK, dtos.BaseResponse{
		Status: "success",
		Data: gin.H{
			"message": "link is valid",
		},
	})
}

func (uh *UserHandler) PatchResetPassword(c *gin.Context) {
	user, ok := uh.VerifyParam(c)
	if !ok {
		c.JSON(http.StatusInternalServerError, dtos.BaseResponse{
			Status: "failed",
			Error: &dtos.ErrorResponse{
				ErrorMessage: "verify param error",
			},
		})
	}

	req := dtos.ResetPasswordRequest{}
	if err := c.ShouldBind(&req); err != nil {
		c.JSON(http.StatusBadRequest, dtos.BaseResponse{
			Status: "failed",
			Error: &dtos.ErrorResponse{
				ErrorMessage: err.Error(),
			},
		})
		return
	}

	if err := uh.UserUsecase.ResetPassword(user.Username, req); err != nil {
		c.JSON(http.StatusInternalServerError, dtos.BaseResponse{
			Status: "failed",
			Error: &dtos.ErrorResponse{
				ErrorMessage: "failed to reset password",
			},
		})
	}

	c.JSON(http.StatusOK, dtos.BaseResponse{
		Status: "success",
		Data: gin.H{
			"message": "reset password success",
		},
	})
}

func (uh *UserHandler) GetUserList(c *gin.Context) {
	users, err := uh.UserUsecase.Find()
	if err != nil {
		c.JSON(http.StatusInternalServerError, dtos.BaseResponse{
			Error: &dtos.ErrorResponse{
				ErrorMessage: err.Error(),
			},
		})
		return
	}

	userResp := []dtos.UserResponse{}
	for _, user := range users {
		userResp = append(userResp, convertUserEntityToUserResponse(&user))
	}

	c.JSON(http.StatusOK, dtos.BaseResponse{
		Status: "success",
		Data:   userResp,
	})
}

func (h *UserHandler) GetUserByID(c *gin.Context) {
	req, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, dtos.BaseResponse{
			Status: "failed",
			Error: &dtos.ErrorResponse{
				ErrorMessage: err.Error(),
			},
		})
		return
	}

	user, err := h.UserUsecase.TakeByID(req)
	if err != nil && errors.Is(err, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusNotFound, dtos.BaseResponse{
			Status: "failed",
			Error: &dtos.ErrorResponse{
				ErrorMessage: err.Error(),
			},
		})
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, dtos.BaseResponse{
			Status: "failed",
			Error: &dtos.ErrorResponse{
				ErrorMessage: err.Error(),
			},
		})
		return
	}

	c.JSON(http.StatusOK, dtos.BaseResponse{
		Status: "success",
		Data:   convertUserEntityToUserResponse(&user),
	})
}

func (uh *UserHandler) GetProfile(c *gin.Context) {
	currentUser := c.MustGet("current_username").(string)

	user, err := uh.UserUsecase.TakeByUsername(currentUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, dtos.BaseResponse{
			Status: "failed",
			Error: &dtos.ErrorResponse{
				ErrorMessage: err.Error(),
			},
		})
		return
	}

	c.JSON(http.StatusOK, dtos.BaseResponse{
		Status: "success",
		Data: gin.H{
			"user": convertUserEntityToUserResponse(user),
		},
	})
}

func (uh *UserHandler) FollowUser(c *gin.Context) {
	currentUsername := c.MustGet("current_username").(string)
	friendUsername := c.Param("username")

	if currentUsername != "" || friendUsername != "" {
		c.JSON(http.StatusInternalServerError, dtos.BaseResponse{
			Status: "failed",
			Error: &dtos.ErrorResponse{
				ErrorMessage: "current username or friend username is not valid",
			},
		})
		return
	}

	_, err := uh.UserUsecase.FollowUser(currentUsername, friendUsername)
	if err != nil {
		c.JSON(http.StatusInternalServerError, dtos.BaseResponse{
			Status: "failed",
			Error: &dtos.ErrorResponse{
				ErrorMessage: err.Error(),
			},
		})
		return
	}

	c.JSON(http.StatusOK, dtos.BaseResponse{
		Status: "success",
		Data: gin.H{
			"messsage": "follow successfully",
		},
	})
}

func (uh *UserHandler) UnFollowUser(c *gin.Context) {
	currentUsername := c.MustGet("current_username").(string)
	friendUsername := c.Param("username")

	if currentUsername != "" || friendUsername != "" {
		c.JSON(http.StatusInternalServerError, dtos.BaseResponse{
			Status: "failed",
			Error: &dtos.ErrorResponse{
				ErrorMessage: "current username or friend username is not valid",
			},
		})
		return
	}

	_, err := uh.UserUsecase.UnFollowUser(currentUsername, friendUsername)
	if err != nil {
		c.JSON(http.StatusInternalServerError, dtos.BaseResponse{
			Status: "failed",
			Error: &dtos.ErrorResponse{
				ErrorMessage: err.Error(),
			},
		})
		return
	}

	c.JSON(http.StatusOK, dtos.BaseResponse{
		Status: "success",
		Data: gin.H{
			"messsage": "unfollow successfully",
		},
	})
}

func (uh *UserHandler) VerifyParam(c *gin.Context) (*entities.User, bool) {
	email := c.Param("email")
	if email == "" {
		return &entities.User{}, false
	}

	decodedEmail, err := base64.StdEncoding.DecodeString(email)
	if err != nil {
		return &entities.User{}, false
	}

	token := c.Param("token")
	if token == "" {
		return &entities.User{}, false
	}

	tokenUsername, err := auth.ValidateJWT(token)
	if err != nil {
		return &entities.User{}, false
	}

	user, err := uh.UserUsecase.TakeByConditions(map[string]interface{}{
		"username": tokenUsername,
	})
	if err != nil {
		return &entities.User{}, false
	}

	if string(decodedEmail) != user.Email {
		return &entities.User{}, false
	}

	verifyToken := auth.VerifyJWT(token)
	if !verifyToken {
		return &entities.User{}, false
	}

	return user, true
}

// convertUserEntityToUserResponse func
func convertUserEntityToUserResponse(user *entities.User) dtos.UserResponse {
	return dtos.UserResponse{
		FirstName:   user.FirstName,
		LastName:    user.LastName,
		Username:    user.Username,
		AvatarUrl:   user.AvatarUrl,
		Bio:         user.Bio,
		Email:       user.Email,
		PhoneNumber: user.PhoneNumber,
		Gender:      string(user.Gender),
		IsVerified:  user.IsVerified,
		CreatedAt:   user.CreatedAt,
		UpdatedAt:   user.UpdatedAt,
		DeletedAt:   user.DeletedAt,
	}
}
