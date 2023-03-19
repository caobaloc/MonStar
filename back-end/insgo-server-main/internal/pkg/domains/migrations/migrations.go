package migrations

import (
	"gitlab.com/ducanhng.dev/insgo-server/internal/pkg/domains/models/entities"
	"gorm.io/gorm"
)

func Migrate(dbConn *gorm.DB) error {
	err := dbConn.AutoMigrate(entities.User{})

	// user := &entities.User{
	// 	FirstName: "Admin",
	// 	Username:  "admin",
	// 	Email:     "admin@example.com",
	// 	Password:  "Admin@123456",
	// }

	// if err := dbConn.Create(user).Error; err != nil {
	// 	log.Fatalln("Create admin user fail", "err", err)
	// }

	return err
}
