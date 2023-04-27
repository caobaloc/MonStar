import React from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Sidebar.module.scss';
import images from '~/assets/images';
import config from '~/config';
import Menu, { MenuItem } from './Menu';

const cx = classNames.bind(styles);

function Sidebar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  function logOut() {
    axios
      .post(`http://localhost:8080/api/auth/logout`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        console.log('Logout Thanh cong!');
        localStorage.removeItem('token');
        navigate('/login');
      })
      .catch((error) => {
        console.log('Error: ' + error);
      });
  }

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
            <MenuItem title="Chat GPT" to={config.routes.explore} />
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
                  <button style={{ color: 'white' }} onClick={logOut}>
                    Log out
                  </button>
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
