import classNames from 'classnames/bind';
import React, { useState } from 'react';

import images from '~/assets/images';
import styles from '~/components/compCss.module.scss';
const cx = classNames.bind(styles);

function ShareButton() {
  const imgShare = images.iconShare;

  function sharef() {}

  return (
    <div className={cx('btn')}>
      <button onClick={sharef}>
        <img style={{ height: '21px' }} src={imgShare} alt="Share" />
      </button>
    </div>
  );
}

export default ShareButton;
