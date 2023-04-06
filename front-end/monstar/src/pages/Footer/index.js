import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <div className={cx('footer')}>
      <div className={cx('footer-link-contact')}>
        <a href="#">Meta</a>
        <a href="#">Giới thiệu</a>
        <a href="#">Blog</a>
        <a href="#">Việc làm</a>
        <a href="#">Trợ giúp</a>
        <a href="#">API</a>
        <a href="#">Quyền riêng tư</a>
        <a href="#">Điều khoản</a>
        <a href="#">Tài khoản liên quan nhất</a>
        <a href="#">Vị trí</a>
        <a href="#">Instagram Lite</a>
        <a href="#">Tải thông tin người liên hệ lên & người không phải người dùng</a>
        <a href="#">Meta đã xác minh</a>
      </div>
      <div className={cx('footer-language')}>
        <label htmlFor="#">Language</label>
        <label htmlFor="#">© 2023 Instagram from Meta</label>
      </div>
    </div>
  );
};

export default Footer;
