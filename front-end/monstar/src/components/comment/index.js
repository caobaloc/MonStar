import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './comment.module.scss';
import images from '~/assets/images';
const cx = classNames.bind(styles);

function Comment({ cmt, username }) {
  return (
    <div className={cx('comment')}>
      <div>
        <img src={images.avatar1} alt="" />
      </div>
      <div>
        <span className={cx('username')}>
          {username} <span className={cx('cmt')}>{cmt}</span>
        </span>
      </div>
    </div>
  );
}
Comment.prototype = {
  cmt: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default Comment;
