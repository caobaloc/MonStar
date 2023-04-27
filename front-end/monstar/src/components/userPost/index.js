import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import images from '~/assets/images';

import * as request from '~/utils/requests';
import styles from '~/components/userPost/UserPost.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function UserPosts({ url, like, cmt }) {
  return (
    <div className={cx('user_post')}>
      <div className={cx('post')}>
        <img src={url} alt="" />
        <div className={cx('like-cmt')}>
          <img src={images.iconHeart} alt="" /> <span>{like}</span>
          <div>
            <img src={images.iconCmt} alt="" /> <span>{cmt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
UserPosts.prototype = {
  url: PropTypes.string.isRequired,
  like: PropTypes.string.isRequired,
  cmt: PropTypes.string.isRequired,
};
export default UserPosts;
