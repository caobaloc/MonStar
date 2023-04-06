import React from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Routes, Route, Link } from 'react-router-dom';

import styles from './Sidebar.module.scss';
import images from '~/assets/images';
import config from '~/config';
import Menu, { MenuItem } from './Menu';

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <div style={{ width: '420px' }}>
      <Menu>
        <div style={{ paddingLeft: '20px' }}>
          <h1>MonStar</h1>
          <span className={cx('menu-span')}>
            <img src={images.iconHome} alt="" className={cx('iconImg')} />
            <MenuItem title="Home" to={config.routes.home} />
          </span>
          <span className={cx('menu-span')}>
            <img src={images.iconSearch} alt="" className={cx('iconImg')} />
            <MenuItem title="Search" to={config.routes.search} />
          </span>
          <span className={cx('menu-span')}>
            <img src={images.iconExplore} alt="" className={cx('iconImg')} />
            <MenuItem title="Explore" to={config.routes.explore} />
          </span>
          <span className={cx('menu-span')}>
            <img src={images.iconReel} alt="" className={cx('iconImg')} />
            <MenuItem title="Reels" to={config.routes.reels} />
          </span>
          <span className={cx('menu-span')}>
            <img src={images.iconMessages} alt="" className={cx('iconImg')} />
            <MenuItem title="Messages" to={config.routes.messages} />
          </span>
          <span className={cx('menu-span')}>
            <img src={images.iconNotify} alt="" className={cx('iconImg')} />
            <MenuItem title="Notifications" to={config.routes.login} />
          </span>
          <span className={cx('menu-span')}>
            <img src={images.iconCreate} alt="" className={cx('iconImg')} />
            <MenuItem title="Create" to={config.routes.create} />
          </span>
          <span className={cx('menu-span')}>
            <img style={{ borderRadius: '50%' }} src={images.avatar1} alt="" className={cx('iconImg')} />
            <MenuItem title="Profile" to={config.routes.profile} />
          </span>
        </div>
        <div>
          <Tippy
            // visible
            interactive
            delay={[150, 200]}
            placement="bottom"
            render={(attrs) => (
              <ul className={cx('more-items')}>
                <li>
                  <MenuItem title="Setting" to={config.routes.edit} />
                </li>
                <li>activity</li>
                <li>Saved</li>
                <li>switch appearance</li>
                <li>Report a problem</li>
                <li>Switch accounts</li>
                <li>
                  <Link to="/Login">Log out</Link>
                </li>
              </ul>
            )}
          >
            <span className={cx('menu-more')}>
              <img src={images.iconMenu} alt="" className={cx('iconImg')} />
              <span>More</span>
            </span>
          </Tippy>
        </div>
      </Menu>
    </div>
  );
}

export default Sidebar;
