package entities

import "gorm.io/gorm"

var ImagesTableName = "images"

type Image struct {
	ID       int    `gorm:"column:id;type:int;primaryKey;autoIncrement"`
	PostID   int    `gorm:"column:post_id;type:int;not null"`
	ImageURL string `gorm:"column:image_url;type:varchar(255);not null"`
	gorm.Model
}

func (*Image) TableName() string {
	return ImagesTableName
}
