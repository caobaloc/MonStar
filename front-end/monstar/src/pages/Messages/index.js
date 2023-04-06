import classNames from 'classnames/bind';

import images from '~/assets/images';
import Button from '~/components/Button';
import styles from './Messages.module.scss';

const cx = classNames.bind(styles);

function Messages() {
  return (
    <div className={cx('chat')}>
      <div className={cx('chat-left')}>
        <div className={cx('left-header')}>Lý An Vy</div>
        <div className={cx('left-username')}>
          <div className={cx('username-header')}>
            <img src={images.avatar1} alt="" /> {/** avatar */}
            <div className={cx('username')}>
              <span>Le Trung Hieu</span> {/** username */}
              <div className={cx('user-content')}>
                <div>Oke tôi nhớ r bro. Oke tôi nhớ r bro Oke tôi nhớ r bro</div> {/** content */}
                <div>. 2w</div> {/** time */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('chat-right')}>
        <div className={cx('right-header')}>
          <div className={cx('header-user')}>
            <img src={images.avatar1} alt="" />
            <span>Le Trung Hieu</span>
          </div>
          <div className={cx('header-icon')}>
            <img src={images.iconCall} alt="" />
            <img src={images.iconVideoCall} alt="" />
            <img src={images.iconInfo} alt="" />
          </div>
        </div>

        <div className={cx('chat-content')}></div>
        <div style={{ padding: '20px' }}>
          <div className={cx('rep-chat')}>
            <Button>
              <img src={images.iconSmile} alt="" />
            </Button>
            <input type="textarea" placeholder="Message..." />
            <Button>
              <img src={images.iconImage} alt="" />
            </Button>
            <Button>
              <img src={images.iconNotify} alt="" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
{
  /* <div>
          <label htmlFor="">Lý An Vy</label>
        </div>

        <div style={{ padding: '8px 20px' }}>
          <div className={cx('chat-username')}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={images.avatar1} alt="" className={cx('iconImg')} />
              <div>
                <div>Lý An Vy</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>Bạn tao sắp lấy chồng chúng</div>
                  <div>1d</div>
                </div>
              </div>
            </div>
          </div>
        </div> */
}
