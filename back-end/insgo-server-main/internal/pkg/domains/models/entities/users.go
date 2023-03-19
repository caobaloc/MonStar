package entities

import (
	"time"

	"gorm.io/gorm"
)

// UsersTableName TableName
var UsersTableName = "users"

type User struct {
	ID               int       `gorm:"column:id;type:int;primaryKey;autoIncrement"`
	FirstName        string    `gorm:"column:first_name;type:varchar(255)"`
	LastName         string    `gorm:"column:last_name;type:varchar(255)"`
	Username         string    `gorm:"column:username;type:varchar(255);unique;not null"`
	AvatarUrl        string    `gorm:"column:avatar_url;type:varchar(255)"`
	Bio              string    `gorm:"column:bio;type:varchar(255)"`
	Email            string    `gorm:"column:email;type:varchar(255);unique;not null"`
	PhoneNumber      string    `gorm:"column:phone_number;type:varchar(255)"`
	Gender           string    `gorm:"column:gender;type:varchar(255)"`
	Password         string    `gorm:"column:password;type:varchar(255)"`
	EmailVerifiedAt  time.Time `gorm:"column:email_verified_at;type:datetime;not null;default:1800-10-01"`
	IsVerified       bool      `gorm:"column:is_verified;type:boolean;not null;default:false"`
	VerificationCode string    `gorm:"column:verification_code;type:varchar(255)"`
	Friends          []*User   `gorm:"many2many:friends;association_jointable_foreignkey:friend_id"`
	gorm.Model
}

// TableName func
func (i *User) TableName() string {
	return UsersTableName
}
