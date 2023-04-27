import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import HomePost from '~/components/Layout/DefaultLayout/HomeLayout/HomePost';
import HomeProfile from '~/components/Layout/DefaultLayout/HomeLayout/Profile';

const cx = classNames.bind(styles);

const Home = () => {
  return (
    <div className={cx('home-content')}>
      <div>
        <HomePost />
      </div>
      <div>
        <br />
        <br />
        <HomeProfile />
      </div>
    </div>
  );
};

export default Home;
