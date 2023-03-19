package entities

import "gorm.io/gorm"

var HashTagFollowsTableName = "post_tags"

type HashTagFollow struct {
	ID        int `gorm:"column:id;type:int;primaryKey;autoIncrement"`
	UserID    int `gorm:"column:user_id;type:int;not null"`
	HashTagID int `gorm:"column:hash_tag_id;type:int;not null"`
	gorm.Model
}

func (*HashTagFollow) TableName() string {
	return HashTagFollowsTableName
}
