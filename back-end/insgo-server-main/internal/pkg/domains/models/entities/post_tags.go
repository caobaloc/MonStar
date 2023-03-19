package entities

import "gorm.io/gorm"

var PostTagsTableName = "post_tags"

type PostTag struct {
	ID        int `gorm:"column:id;type:int;primaryKey;autoIncrement"`
	PostID    int `gorm:"column:post_id;type:int;not null"`
	HashTagID int `gorm:"column:hash_tag_id;type:int;not null"`
	gorm.Model
}

func (*PostTag) TableName() string {
	return PostTagsTableName
}
