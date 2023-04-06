import React from 'react';
import classNames from 'classnames/bind';
import { Routes, Route, Link } from 'react-router-dom';

import styles from './MenuTwo.module.scss';
import config from '~/config';
import Menu, { MenuItem } from '~/components/Layout/Sidebar/Menu';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function MenuTwo() {
  return (
    <Menu>
      <div className={cx('menu-two')}>
        <MenuItem title="Edit Profile" to={config.routes.edit} />
        <MenuItem title="Change password" to={config.routes.change} />
        <MenuItem title="Apps and websites" />
        <MenuItem title="Email notifications" />
        <MenuItem title="Push notifications" />
        <MenuItem title="Manage contacts" />
        <MenuItem title="Privacy and security" />
        <MenuItem title="Ads" />
        <MenuItem title="Supervision" />
        <MenuItem title="Login activity" />
        <MenuItem title="Emails from instagram" />
        <MenuItem title="Help" />
      </div>
      <div className={cx('meta')}>
        <h3>Meta</h3>
        <Button>Accounts Center</Button>
        <br />
        <div>
          <label htmlFor="">
            Control settings for connected experiences across Instagram, the Facebook app and Messenger, including story and post sharing and logging
            in.
          </label>
        </div>
      </div>
    </Menu>
  );
}

export default MenuTwo;
