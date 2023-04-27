import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import images from '~/assets/images';
import styles from './HomeHeader.module.scss';

const cx = classNames.bind(styles);

function HomeHeader({ headerAvatar, username }) {
  return (
    <div className={cx('home-header')}>
      <div>
        <img src={headerAvatar} alt="" className={cx('iconImg')} />
        <span>{username}</span>
      </div>

      <div>
        <img src={images.iconOptions} alt="" className={cx('iconImg')} />
      </div>
    </div>
  );
}
HomeHeader.prototype = {
  headerAvatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
export default HomeHeader;
