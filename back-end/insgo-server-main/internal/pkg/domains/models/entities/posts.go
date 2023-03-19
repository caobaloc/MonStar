package entities

import "gorm.io/gorm"

var PostsTableName = "posts"

type Post struct {
	ID       int     `gorm:"column:id;type:int;primaryKey;autoIncrement"`
	UserID   int     `gorm:"column:user_id;type:int;not null"`
	Caption  *string `gorm:"column:caption;type:text"`
	Location *string `gorm:"column:location;type:varchar(255)"`
	gorm.Model
}

func (*Post) TableName() string {
	return PostsTableName
}
