import classNames from 'classnames/bind';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import images from '~/assets/images';
import axios from 'axios';
import styles from '~/components/compCss.module.scss';

const cx = classNames.bind(styles);

function SaveButton({ idpost }) {
  const imgSave = images.iconSave;
  const imgSaved = images.iconSaved;

  const [saves, setSaves] = useState(images.iconSave);
  const token = localStorage.getItem('token');

  function savef() {
    axios
      .get(`http://localhost:8080/api/post/save/${idpost}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        console.log(res.data.data.message);
        if (res.data.data.message === 'save successfully') {
          setSaves(images.iconSaved);
        } else {
          setSaves(images.iconSave);
        }
      })
      .catch((error) => {
        console.log('Error: ' + error);
      });
  }

  return (
    <div className={cx('btn')}>
      <button onClick={savef}>
        <img src={saves} alt="Save" />
      </button>
    </div>
  );
}
SaveButton.prototype = {
  idpost: PropTypes.string.isRequired,
};
export default SaveButton;
