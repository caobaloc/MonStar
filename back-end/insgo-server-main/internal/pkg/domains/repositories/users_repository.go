package repositories

import (
	"github.com/sirupsen/logrus"
	"gitlab.com/ducanhng.dev/insgo-server/internal/pkg/domains/interfaces"
	"gitlab.com/ducanhng.dev/insgo-server/internal/pkg/domains/models/entities"
	"gorm.io/gorm"
)

type userRepository struct {
	logger *logrus.Logger
	DBConn *gorm.DB
}

func NewUserRepository(dbConn *gorm.DB) interfaces.UserRepository {
	return &userRepository{
		DBConn: dbConn,
	}
}

func (ur *userRepository) Find() ([]entities.User, error) {
	users := []entities.User{}

	result := ur.DBConn.Find(&users)

	return users, result.Error
}

func (ur *userRepository) TakeByID(id int) (entities.User, error) {
	user := entities.User{}
	result := ur.DBConn.Take(&user, id)
	return user, result.Error
}

func (ur *userRepository) TakeByUsername(username string) (*entities.User, error) {
	user := entities.User{}
	return &user, ur.DBConn.Where("username = ?", username).Take(&user).Error
}

func (ur *userRepository) TakeByConditions(conditions map[string]interface{}) (*entities.User, error) {
	user := entities.User{}
	return &user, ur.DBConn.Where(conditions).Take(&user).Error
}

func (ur *userRepository) FindByConditions(conditions map[string]interface{}) ([]entities.User, error) {
	users := []entities.User{}
	return users, ur.DBConn.Find(users, conditions).Error
}

func (ur *userRepository) Create(user entities.User) (*entities.User, error) {
	result := ur.DBConn.Create(&user)
	return &user, result.Error
}

func (ur *userRepository) Update(user *entities.User) error {
	return ur.DBConn.Save(user).Error
}

func (ur *userRepository) AppendAssociationFriend(user, friend *entities.User) error {
	return ur.DBConn.Model(&user).Association("Friends").Append(friend)
}

func (ur *userRepository) DeleteAssociationFriend(user, friend *entities.User) error {
	return ur.DBConn.Model(&user).Association("Friends").Delete(friend)
}
