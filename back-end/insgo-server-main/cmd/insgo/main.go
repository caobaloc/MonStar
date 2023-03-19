package main

import (
	"os"

	"github.com/gin-gonic/gin"
	"gitlab.com/ducanhng.dev/insgo-server/internal/app/router"
	"gitlab.com/ducanhng.dev/insgo-server/internal/pkg/domains/migrations"
	"gitlab.com/ducanhng.dev/insgo-server/pkg/shared/configs/database"
	sharedLogger "gitlab.com/ducanhng.dev/insgo-server/pkg/shared/logger"
)

func main() {
	logger := sharedLogger.NewLogger()

	ginMode := gin.DebugMode
	if os.Getenv("ENV") != "dev" && os.Getenv("ENV") != "local" {
		ginMode = gin.ReleaseMode
	}
	gin.SetMode(ginMode)

	dbconfig := database.DBConfig{
		HostMaster: os.Getenv("DB_HOST"),
		HostSlaver: os.Getenv("DB_HOST"),
		Name:       os.Getenv("DB_NAME"),
		User:       os.Getenv("DB_USER"),
		Pass:       os.Getenv("DB_PASS"),
		Port:       os.Getenv("DB_PORT"),
		Type:       database.MySQL,
		Charset:    "utf8mb4",
	}

	logger.Info("Init Database")
	dbConn, err := database.NewDB(dbconfig, logger)
	if err != nil {
		logger.Fatalln("Failed to connect database.")
		panic(err)
	}
	logger.Info("Init Database Success")

	defer database.CloseDB(logger, dbConn)

	logger.Info("Migrate Database")
	err = migrations.Migrate(dbConn)
	if err != nil {
		logger.Fatalln("Failed to migrate database.")
		panic(err)
	}
	logger.Info("Migrate Database Success")

	// api router
	engine := gin.Default()
	router := &router.Router{
		Engine: engine,
		DBCon:  dbConn,
	}
	router.InitializeRouter(logger)
	router.SetupHandler()

	engine.Run(":" + os.Getenv("PORT"))
}
