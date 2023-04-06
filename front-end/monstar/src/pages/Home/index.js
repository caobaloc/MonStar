import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import HomeHeader from '~/components/Layout/DefaultLayout/HomeLayout/Header';
import HomeContent from '~/components/Layout/DefaultLayout/HomeLayout/Content';
import HomeProfile from '~/components/Layout/DefaultLayout/HomeLayout/Profile';

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx('home-content')}>
      <div>
        <HomeHeader />
        <HomeContent />
        <HomeHeader />
        <HomeContent />
        <HomeHeader />
        <HomeContent />
        <HomeHeader />
        <HomeContent />
      </div>
      <div>
        <HomeProfile />
      </div>
    </div>
  );
}

export default Home;
