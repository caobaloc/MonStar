package entities

import "gorm.io/gorm"

var FollowsTableName = "follows"

type Follow struct {
	ID         int `gorm:"column:id;type:int;primaryKey;autoIncrement"`
	UserID     int `gorm:"column:user_id;type:int;not null"`
	FollowerID int `gorm:"column:follower_id;type:int;not null"`
	gorm.Model
}

func (*Follow) TableName() string {
	return FollowsTableName
}
