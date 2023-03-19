package entities

import "gorm.io/gorm"

var UserInfosTableName = "user_infos"

type UserInfo struct {
	ID              int     `gorm:"column:id;type:int;primaryKey;autoIncrement"`
	UserID          int     `gorm:"column:user_id;type:int;not null"`
	FirstName       *string `gorm:"column:first_name;type:varchar(255)"`
	LastName        *string `gorm:"column:last_name;type:varchar(255)"`
	Username        *string `gorm:"column:username;type:varchar(255);unique"`
	ProfileImageURL *string `gorm:"column:profile_image_url;type:varchar(255)"`
	Discription     *string `gorm:"column:discription;type:text"`
	Phone           *string `gorm:"column:phone;type:varchar(15)"`
	gorm.Model
}

func (*UserInfo) TableName() string {
	return UserInfosTableName
}
