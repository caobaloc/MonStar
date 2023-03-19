package entities

import "gorm.io/gorm"

var HashTagsTableName = "hash_tags"

type HashTag struct {
	ID   int    `gorm:"column:id;type:int;primaryKey;autoIncrement"`
	Name string `gorm:"column:name;type:varchar(255);not null"`
	gorm.Model
}

func (*HashTag) TableName() string {
	return HashTagsTableName
}
