import classNames from 'classnames/bind';

import images from '~/assets/images';
import Button from '~/components/Button';
import Menu, { MenuItem } from '~/components/Layout/Sidebar/Menu';
import config from '~/config';
import styles from '~/pages/Profile/Profile.module.scss';
import Footer from '../Footer';
import MenuTwo from '~/components/Layout/MenuTwo/index.js';

const cx = classNames.bind(styles);

function ChangePW() {
  return (
    <div>
      <div className={cx('edit-profile')}>
        <div className={cx('menu')}>
          <MenuTwo />
        </div>
        <div className={cx('edit-pro-right')}>
          <div className={cx('content')}>
            <div className={cx('font-big')}>
              <img src={images.avatar1} alt="" />
            </div>
            <div style={{ lineHeight: '50px' }}>
              <label htmlFor="">Ly_anzy</label>
            </div>
          </div>
          <br />
          {/* Old password */}
          <div className={cx('content')}>
            <div className={cx('font-big')}>
              <label htmlFor="">Old password</label>
            </div>
            <div className={cx('right')}>
              <input type="password" />
              <br />
            </div>
          </div>
          <br />
          {/* New password */}
          <div className={cx('content')}>
            <div className={cx('font-big')}>
              <label htmlFor="">New password</label>
            </div>
            <div className={cx('right')}>
              <input type="password" />
              <br />
            </div>
          </div>
          <br />
          {/* Confirm password */}
          <div className={cx('content')}>
            <div className={cx('font-big')}>
              <label htmlFor="">Confirm new password</label>
            </div>
            <div className={cx('right')} style={{ paddingTop: '10px' }}>
              <input type="password" />
              <br />
            </div>
          </div>
          {/* Button submit */}
          <div className={cx('content')}>
            <div className={cx('font-big')}></div>
            <div className={cx('right')}>
              <br />
              <Button>Change password</Button>
              <button>Forgot password</button>
              <br />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ChangePW;
