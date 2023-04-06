import classNames from 'classnames/bind';

import images from '~/assets/images';
import Button from '~/components/Button';
import Menu, { MenuItem } from '~/components/Layout/Sidebar/Menu';
import config from '~/config';
import styles from '~/pages/Profile/Profile.module.scss';
import Footer from '../Footer';
import MenuTwo from '~/components/Layout/MenuTwo/index.js';

const cx = classNames.bind(styles);

function EditProfile() {
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
            <div>
              <label htmlFor="">Ly_anzy</label>
              <br />
              <button>Change profile photo</button>
            </div>
          </div>
          <br />
          <div className={cx('content')}>
            <div className={cx('font-big')}>
              <label htmlFor="">Name</label>
            </div>
            <div className={cx('right')}>
              <input type="text" />
              <br />
              <div className={cx('font-small')}>
                <label htmlFor="">
                  Help people discover your account by using the name you're known by: either your full name, nickname, or business name.
                </label>
                <br />
                <br />
                <label htmlFor="">You can only change your name twice within 14 days.</label>
              </div>
            </div>
          </div>
          {/* username */}
          <div className={cx('content')}>
            <div className={cx('font-big')}>
              <label htmlFor="">Username</label>
            </div>
            <div className={cx('right')}>
              <input type="text" />
              <br />
              <div className={cx('font-small')}>
                <label htmlFor="">
                  In most cases, you'll be able to change your username back to ly_anzy for another 14 days. <button>Learn more</button>
                </label>
              </div>
            </div>
          </div>
          {/* Website */}
          <div className={cx('content')}>
            <div className={cx('font-big')}>
              <label htmlFor="">Website</label>
            </div>
            <div className={cx('right')}>
              <input type="text" />
              <br />
              <div className={cx('font-small')}>
                <label htmlFor="">
                  Editing your links is only available on mobile. Visit the Instagram app and edit your profile to change the websites in your bio.{' '}
                </label>
              </div>
            </div>
          </div>

          {/* Infomations */}
          <div className={cx('content')}>
            <div className={cx('font-big')}></div>
            <div className={cx('right')}>
              <br />
              <div className={cx('font-small')}>
                <p>Personal information</p>
                <label htmlFor="">
                  Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your
                  public profile.
                </label>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className={cx('content')}>
            <div className={cx('font-big')}>
              <label htmlFor="">Email</label>
            </div>
            <div className={cx('right')}>
              <input type="text" />
              <br />
            </div>
          </div>
          <br />

          {/* Phone number */}
          <div className={cx('content')}>
            <div className={cx('font-big')}>
              <label htmlFor="">Phone number</label>
            </div>
            <div className={cx('right')}>
              <input type="text" />
              <br />
            </div>
          </div>
          <br />

          {/* Gender */}
          <div className={cx('content')}>
            <div className={cx('font-big')}>
              <label htmlFor="">Gender</label>
            </div>
            <div className={cx('right')}>
              <input type="text" />
              <br />
            </div>
          </div>

          {/* Button submit */}
          <div className={cx('content')}>
            <div className={cx('font-big')}></div>
            <div className={cx('right')}>
              <br />
              <Button>Submit</Button>
              <button>Temporarily deactivate account</button>
              <br />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditProfile;
