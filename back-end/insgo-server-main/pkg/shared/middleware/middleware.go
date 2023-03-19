package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"gitlab.com/ducanhng.dev/insgo-server/internal/pkg/domains/models/dtos"
	"gitlab.com/ducanhng.dev/insgo-server/pkg/shared/auth"
)

func DeserializeUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		var token string
		cookie, err := c.Cookie("token")

		authorizationHeader := c.Request.Header.Get("Authorization")
		fields := strings.Fields(authorizationHeader)

		if len(fields) != 0 && fields[0] == "Bearer" {
			token = fields[1]
		} else if err == nil {
			token = cookie
		}

		if token == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, dtos.BaseResponse{
				Status: "fail",
				Data: gin.H{
					"message": "You are not logged in",
				},
			})
			return
		}

		username, err := auth.ValidateJWT(token)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, dtos.BaseResponse{
				Status: "fail",
				Data: gin.H{
					"message": err.Error(),
				},
			})
			return
		}

		c.Set("current_username", username)
		c.Next()
	}
}
