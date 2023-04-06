import classNames from 'classnames/bind';

import images from '~/assets/images';
import styles from './HomeContent.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function HomeContent() {
  return (
    <div className={cx('header-content')}>
      <div className={cx('images-home')}>
        <img src={images.tempAvatar} alt="Image user" />
      </div>
      <div className={cx('home-ct-padding')}>
        <div className={cx('home-btn-icon')}>
          <div>
            <Button>
              <img src={images.iconNotify} alt="Like" />
            </Button>
            <Button>
              <img src={images.iconMessages} alt="Comment" />
            </Button>
            <Button>
              <img src={images.iconShare} alt="Share" />
            </Button>
          </div>
          <div>
            <Button>
              <img src={images.iconSave} alt="Save" />
            </Button>
          </div>
        </div>
        <div className={cx('like-number')}>
          <Button>1200 Likes</Button>
        </div>
        <div className={cx('home-cmt')}>
          <div>
            <img src={images.iconSmile} alt="" />
            <input type="text" placeholder="Add a comment..." />
          </div>
          <button>Post</button>
        </div>
      </div>
    </div>
  );
}

export default HomeContent;
