import classNames from 'classnames/bind';
import React, { useState } from 'react';

import images from '~/assets/images';
import styles from '~/components/compCss.module.scss';
const cx = classNames.bind(styles);

function CmtButton() {
  const imgCmt = images.iconCmt;

  function commentf() {}

  return (
    <div className={cx('btn')}>
      <button onClick={commentf}>
        <img style={{ height: '24px' }} src={imgCmt} alt="Comment" />
      </button>
    </div>
  );
}

export default CmtButton;
