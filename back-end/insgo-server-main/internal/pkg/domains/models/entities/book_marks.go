package entities

import "gorm.io/gorm"

var BookMarksTableName = "book_marks"

type BookMark struct {
	ID     int `gorm:"column:id;type:int;primaryKey;autoIncrement"`
	UserID int `gorm:"column:user_id;type:int;not null"`
	PostID int `gorm:"column:post_id;type:int;not null"`
	gorm.Model
}

func (*BookMark) TableName() string {
	return BookMarksTableName
}
