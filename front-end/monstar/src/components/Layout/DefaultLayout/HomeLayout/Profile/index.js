import classNames from 'classnames/bind';

import images from '~/assets/images';
import Button from '~/components/Button';
import styles from './Profile.module.scss';
import Footer from '~/pages/Footer';

const cx = classNames.bind(styles);

function HomeProfile() {
  return (
    <div className={cx('home-profile')}>
      <div className={cx('profile-header')}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={images.avatar1} alt="" className={cx('iconImg')} />
          <Button>
            <span className={cx('btn-username')}>Lý An Vy</span>
          </Button>
        </div>

        <div>
          <Button>Switch</Button>
        </div>
      </div>

      <div className={cx('header-fl')}>
        <label htmlFor="">Suggestions for you</label>
        <Button>See All</Button>
      </div>

      <div className={cx('fl-content')}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={images.avatar1} alt="" className={cx('iconImg')} />
          <Button>
            <span className={cx('btn-username')}>Lý An Vy</span>
          </Button>
        </div>
        <div>
          <Button>Follow</Button>
        </div>
      </div>
      <div className={cx('fl-content')}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={images.avatar1} alt="" className={cx('iconImg')} />
          <Button>
            <span className={cx('btn-username')}>Lý An Vy</span>
          </Button>
        </div>
        <div>
          <Button>Follow</Button>
        </div>
      </div>
      <div className={cx('fl-content')}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={images.avatar1} alt="" className={cx('iconImg')} />
          <Button>
            <span className={cx('btn-username')}>Lý An Vy</span>
          </Button>
        </div>
        <div>
          <Button>Follow</Button>
        </div>
      </div>
      <div className={cx('fl-content')}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={images.avatar1} alt="" className={cx('iconImg')} />
          <Button>
            <span className={cx('btn-username')}>Lý An Vy</span>
          </Button>
        </div>
        <div>
          <Button>Follow</Button>
        </div>
      </div>
      <div className={cx('fl-content')}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={images.avatar1} alt="" className={cx('iconImg')} />
          <Button>
            <span className={cx('btn-username')}>Lý An Vy</span>
          </Button>
        </div>
        <div>
          <Button>Follow</Button>
        </div>
      </div>
      <div className={cx('footer')}>
        <div className={cx('footer-link-contact')}>
          <a href="#">About .</a>
          <a href="#"> Help .</a>
          <a href="#"> Press .</a>
          <a href="#"> API .</a>
          <a href="#"> Jobs .</a>
          <a href="#"> Privacy .</a>
          <a href="#"> Terms .</a>
          <a href="#"> Locations .</a>
          <a href="#"> Language .</a>
          <a href="#"> Meta Verifiled .</a>
          <a href="#"> Instagram Lite .</a>
        </div>
      </div>
    </div>
  );
}

export default HomeProfile;
