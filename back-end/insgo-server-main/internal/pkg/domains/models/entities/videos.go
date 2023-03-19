package entities

import "gorm.io/gorm"

var VideosTableName = "videos"

type Video struct {
	ID       int    `gorm:"column:id;type:int;primaryKey;autoIncrement"`
	PostID   int    `gorm:"column:post_id;type:int;not null"`
	VideoURL string `gorm:"column:video_url;type:varchar(255);not null"`
	gorm.Model
}

func (*Video) TableName() string {
	return VideosTableName
}
