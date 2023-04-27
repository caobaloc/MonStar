import classNames from 'classnames/bind';
import { useState } from 'react';
import axios from 'axios';

import images from '~/assets/images';
import styles from '~/components/compCss.module.scss';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function LikeButton({ idpost }) {
  const [likes, setLikes] = useState(images.iconNotify);

  const token = localStorage.getItem('token');

  function likeF() {
    axios
      .get(`http://localhost:8080/api/post/like/${idpost}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        console.log(res.data.data.message);
        if (res.data.data.message === 'like successfully') {
          setLikes(images.iconHeart);
        } else {
          setLikes(images.iconNotify);
        }
      })
      .catch((error) => {
        console.log('Error: ' + error);
      });
  }

  return (
    <div className={cx('btn')}>
      <button onClick={likeF}>
        <img src={likes} alt="Like" />
      </button>
    </div>
  );
}
LikeButton.prototype = {
  idpost: PropTypes.string.isRequired,
};
export default LikeButton;
