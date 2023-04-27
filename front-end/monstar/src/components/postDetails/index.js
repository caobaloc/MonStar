import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import images from '~/assets/images';
import styles from './PostDetails.module.scss';
import Comment from '../comment';
import LikeButton from '~/components/LikeBtn/index';
import SaveButton from '~/components/saveBtn/index';
import CmtButton from '~/components/cmtBtn/index';
import ShareButton from '~/components/shareBtn/index';
import HomeHeader from '~/components/Layout/DefaultLayout/HomeLayout/Header';

const cx = classNames.bind(styles);

function PostDetails({ imgAvatar, idPost, caption, time, like, comment, btnLike, username, url }) {
  const [comments, setComments] = useState('');
  const token = localStorage.getItem('token');
  const [block, setBlock] = useState(true);
  const navigate = useNavigate();

  const divStyle = {
    display: block ? 'block' : 'none',
  };

  function closeModal() {
    setBlock(false);
    console.log('block 1: ', block);
  }

  function createComment() {
    axios
      .post(
        `http://localhost:8080/api/post/${idPost}/comment`,
        {
          content: comments,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      )
      .then((res) => {
        setComments('');
        navigate('/');
        console.log('Thanh cong!');
      })
      .catch((error) => {
        console.log('Error: ' + error);
      });
  }

  return (
    <div className={cx('post-details')} style={divStyle}>
      <button onClick={closeModal}>
        <img src={images.iconClose} alt="" />
      </button>
      <div className={cx('content')}>
        <div className={cx('left-content')}>
          <img src={imgAvatar} alt="" />
        </div>
        <div className={cx('right')}>
          <HomeHeader headerAvatar={imgAvatar} username={username} />
          <div className={cx('comment')}>
            {comment.list_comments.map((index) => {
              return <Comment key={index.id} cmt={index.content} username={index.users.username} />;
            })}
          </div>
          <div className={cx('home-btn-icon')}>
            <div>
              <LikeButton idpost={idPost} />
              <CmtButton />
              <ShareButton />
            </div>
            <div>
              <SaveButton />
            </div>
          </div>
          <div className={cx('home-cmt')}>
            <div>
              <img src={images.iconSmile} alt="" />
              <input type="text" placeholder="Add a comment..." value={comments} onChange={(e) => setComments(e.target.value)} />
            </div>
            <button onClick={createComment}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}
PostDetails.prototype = {
  imgAvatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  idPost: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  like: PropTypes.string.isRequired,
  comment: PropTypes.array.isRequired,
  btnLike: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
export default PostDetails;
