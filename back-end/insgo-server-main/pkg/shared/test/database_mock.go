package test

import (
	"log"

	sqlmock "github.com/DATA-DOG/go-sqlmock"
	"gitlab.com/ducanhng.dev/insgo-server/pkg/shared/configs/database"
	"gorm.io/driver/mysql"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func NewDBMock(dbType database.DBType) (sqlmock.Sqlmock, *gorm.DB) {
	db, mock, err := sqlmock.New()
	if err != nil {
		log.Fatalf("Can't create sqlmock: %s", err)
	}
	// gormDB, err := gorm.Open(mysql.New(mysql.Config{
	// 	Conn: sqlDB,
	//   }), &gorm.Config{})
	var gormDB *gorm.DB
	switch dbType {
	case database.PostgreSQL:
		gormDB, err = gorm.Open(postgres.New(postgres.Config{
			Conn: db,
		}), &gorm.Config{})
	case database.MySQL:
		gormDB, err = gorm.Open(mysql.New(mysql.Config{
			Conn: db,
		}), &gorm.Config{})
	}
	if err != nil {
		log.Fatalf("Can't open gorm connection: %s", err)
	}
	return mock, gormDB
}
