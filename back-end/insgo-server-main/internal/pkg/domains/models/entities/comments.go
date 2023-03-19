package entities

import "gorm.io/gorm"

var CommentsTableName = "comments"

type Comment struct {
	ID      int    `gorm:"column:id;type:int;primaryKey;autoIncrement"`
	UserID  int    `gorm:"column:user_id;type:int;not null"`
	PostID  int    `gorm:"column:post_id;type:int;not null"`
	Content string `gorm:"column:content;type:text;not null"`
	ReplyID *int   `gorm:"column:reply_id;type:int"`
	gorm.Model
}

func (*Comment) TableName() string {
	return CommentsTableName
}
