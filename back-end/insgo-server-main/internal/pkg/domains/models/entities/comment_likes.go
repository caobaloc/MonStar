package entities

import "gorm.io/gorm"

var CommentLikesTableName = "comment_likes"

type CommentLike struct {
	ID        int `gorm:"column:id;type:int;primaryKey;autoIncrement"`
	UserID    int `gorm:"column:user_id;type:int;not null"`
	CommentID int `gorm:"column:comment_id;type:int;not null"`
	gorm.Model
}

func (*CommentLike) TableName() string {
	return CommentLikesTableName
}
