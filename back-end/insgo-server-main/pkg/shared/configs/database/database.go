package database

import (
	"fmt"

	sharedLogger "gitlab.com/ducanhng.dev/insgo-server/pkg/shared/logger"

	"github.com/sirupsen/logrus"
	"gorm.io/driver/mysql"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/plugin/dbresolver"
)

type DBConfig struct {
	HostMaster string
	HostSlaver string
	Name       string
	User       string
	Pass       string
	Port       string
	Charset    string
	Type       DBType
}

// NewDB initialize database
func NewDB(
	config DBConfig,
	logger *logrus.Logger,
) (
	*gorm.DB,
	error,
) {
	var dbConn *gorm.DB
	var err error
	switch config.Type {
	case MySQL:
		// dsn := "user:pass@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
		dsnMaster := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=%s&parseTime=True&loc=Local", config.User, config.Pass, config.HostMaster, config.Port, config.Name, config.Charset)
		dsnSlave := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=%s&parseTime=True&loc=Local", config.User, config.Pass, config.HostSlaver, config.Port, config.Name, config.Charset)

		dbConn, err = gorm.Open(mysql.Open(dsnMaster), &gorm.Config{
			Logger: sharedLogger.NewGormLogger(logger),
		})
		if err != nil {
			return nil, err
		}
		resolver := dbresolver.Register(dbresolver.Config{
			Replicas: []gorm.Dialector{mysql.Open(dsnSlave)},
		})
		err = dbConn.Use(resolver)
		if err != nil {
			return nil, err
		}
	case PostgreSQL:
		// dsn := "host=localhost user=gorm password=gorm dbname=gorm port=9920 sslmode=disable"
		dsnMaster := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", config.HostMaster, config.User, config.Pass, config.Name, config.Port)
		dsnSlave := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", config.HostSlaver, config.User, config.Pass, config.Name, config.Port)

		dbConn, err = gorm.Open(postgres.Open(dsnMaster), &gorm.Config{
			Logger: sharedLogger.NewGormLogger(logger),
		})
		if err != nil {
			return nil, err
		}
		resolver := dbresolver.Register(dbresolver.Config{
			Replicas: []gorm.Dialector{postgres.Open(dsnSlave)},
		})
		err = dbConn.Use(resolver)
		if err != nil {
			return nil, err
		}
	default:
		panic("Unknown type of database!")
	}
	err = Ping(dbConn)
	return dbConn, err
}

func CloseDB(
	logger *logrus.Logger,
	db *gorm.DB,
) {
	myDB, err := db.DB()
	if err != nil {
		logger.Errorf("Error while returning *sql.DB: %v", err)
	}

	logger.Info("Closing the DB connection pool")
	if err := myDB.Close(); err != nil {
		logger.Errorf("Error while closing the master DB connection pool: %v", err)
	}
}

func Ping(db *gorm.DB) error {
	myDB, err := db.DB()
	if err != nil {
		return err
	}

	return myDB.Ping()
}
