import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import * as request from '~/utils/requests';

import UserPosts from '~/components/userPost';
import images from '~/assets/images';
import Button from '~/components/Button';
import styles from './Profile.module.scss';
import config from '~/config';
import Menu, { MenuItem } from '~/components/Layout/Sidebar/Menu';

const cx = classNames.bind(styles);

function Profile() {
  const [userPosts, setUserPosts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    request
      .get(`/user/posts`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => setUserPosts(res.data.posts))
      .catch((error) => {
        console.log(error);
      });
  }, [userPosts.comments]);

  return (
    <div className={cx('profile')}>
      <div className={cx('header-pro')}>
        <div className={cx('avatar-pro')}>
          <img src={images.avatar1} alt="" />
        </div>
        <div className={cx('header-right')}>
          <div>
            <div style={{ fontWeight: '600' }}>ly_anzy</div>
            <div>
              <MenuItem to={config.routes.edit} title="Edit profile" />
              <img src={images.iconSetting} alt="" />
            </div>
          </div>
          <div>
            <div>29 posts</div>
            <div>145 followers</div>
            <div>179 following</div>
          </div>
          <div className={cx('pro-name')}>Lý An Vy</div>
        </div>
      </div>
      <div className={cx('pro-menu')}>
        <div className={cx('pro-menu-post')}>
          <Button>POSTS</Button>
          <Button>REELS</Button>
          <Button>SAVED</Button>
          <Button>TAGGED</Button>
        </div>

        <div>
          {userPosts.map((index) => {
            return <UserPosts key={index.id} url={index.photo.url} like={index.likes.total} cmt={index.comments.total} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
