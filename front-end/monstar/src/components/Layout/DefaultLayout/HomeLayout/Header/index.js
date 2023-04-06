import classNames from 'classnames/bind';

import images from '~/assets/images';
import styles from './HomeHeader.module.scss';

const cx = classNames.bind(styles);

function HomeHeader() {
  return (
    <div className={cx('home-header')}>
      <div>
        <img src={images.iconHome} alt="" className={cx('iconImg')} />
        <span>Lý An Vy</span>
      </div>

      <div>
        <img src={images.iconOptions} alt="" className={cx('iconImg')} />
      </div>
    </div>
  );
}

export default HomeHeader;
