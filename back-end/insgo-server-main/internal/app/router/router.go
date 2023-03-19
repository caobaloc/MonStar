package router

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"gitlab.com/ducanhng.dev/insgo-server/internal/pkg/domains/handlers"
	"gitlab.com/ducanhng.dev/insgo-server/internal/pkg/domains/models/dtos"
	"gitlab.com/ducanhng.dev/insgo-server/pkg/shared/middleware"
	"gitlab.com/ducanhng.dev/insgo-server/pkg/shared/validator"
	"gorm.io/gorm"
)

// Router is application struct
type Router struct {
	Engine *gin.Engine
	DBCon  *gorm.DB
	Logger *logrus.Logger
}

// InitializeRouter initializes Engine and middleware
func (r *Router) InitializeRouter(logger *logrus.Logger) {
	r.Engine.Use(gin.Logger())
	r.Engine.Use(gin.Recovery())
	r.Engine.Use(cors.New(cors.Config{
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowHeaders:     []string{"Authorization", "Origin", "Content-Length", "Content-Type"},
		AllowCredentials: true,
		AllowAllOrigins:  true,
	}))
	r.Logger = logger
}

// SetupHandler set database and redis and use case.
func (r *Router) SetupHandler() {
	userHandler := handlers.NewUserHandler(r.Logger, r.DBCon)
	_ = validator.New()

	// health check
	r.Engine.GET("/health_check", func(c *gin.Context) {
		data := dtos.BaseResponse{
			Status: "success",
			Data:   gin.H{"message": "Health check OK!"},
			Error:  nil,
		}
		c.JSON(http.StatusOK, data)
	})

	// router api
	api := r.Engine.Group("/api")
	{
		//auth
		authApi := api.Group("/auth")
		{
			authApi.GET("/verify_email/:verify_code", userHandler.VerifyEmail)
			authApi.POST("/login", userHandler.Login)
			authApi.POST("/logout", middleware.DeserializeUser(), userHandler.Logout)
			authApi.POST("/register", userHandler.Register)
			authApi.POST("/reset_password", userHandler.ResetPassword)
			authApi.GET("/reset_password/:email/:token", userHandler.VerifyResetPasswordLink)
			authApi.PATCH("/reset_password/:email/:token", userHandler.PatchResetPassword)
		}

		// user
		userApi := api.Group("/user")
		{
			userApi.GET("/list", userHandler.GetUserList)
			// userApi.GET(":id", userHandler.GetUserByID)
			userApi.GET("/:username/follow", middleware.DeserializeUser(), userHandler.FollowUser)
			userApi.GET("/:username/unfollow", middleware.DeserializeUser(), userHandler.UnFollowUser)
			userApi.GET("/me", middleware.DeserializeUser(), userHandler.GetProfile)
		}
	}
}
