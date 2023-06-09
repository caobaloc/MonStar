import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import images from '~/assets/images';
import styles from './HomeContent.module.scss';
import Button from '~/components/Button';
import LikeButton from '~/components/LikeBtn/index';
import SaveButton from '~/components/saveBtn/index';
import CmtButton from '~/components/cmtBtn/index';
import ShareButton from '~/components/shareBtn/index';
import HomeHeader from '~/components/Layout/DefaultLayout/HomeLayout/Header';
import PostDetails from '~/components/postDetails';
import * as request from '~/utils/requests';

const cx = classNames.bind(styles);

function HomeContent({ imgAvatar, idPost, caption, time, like, comment, btnLike, username }) {
  {
    /* các prop cần truyền 
    username, avatar, like, save, comment, number of like, times, captions */
  }
  const [comments, setComments] = useState('');
  const [post, setPost] = useState([]);
  const token = localStorage.getItem('token');
  const [close, setClose] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    request
      .get(`/post/${idPost}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => setPost(res.data.post))
      .catch((error) => {
        console.log(error);
      });
  }, [close]);

  function btnDisplay() {
    setClose(true);
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
    <div>
      <HomeHeader headerAvatar={imgAvatar} username={username} />
      <div className={cx('header-content')}>
        <div className={cx('images-home')}>
          <img src={imgAvatar} alt="Image user" />
        </div>
        <div className={cx('home-ct-padding')}>
          <div className={cx('home-btn-icon')}>
            <div>
              <LikeButton idpost={idPost} />
              <CmtButton />
              <ShareButton />
            </div>
            <div>
              <SaveButton idpost={idPost} />
            </div>
          </div>

          <div className={cx('like-number')}>
            <Button>{like}</Button> {/*  like */}
            <p>{caption}</p>
            {/* <PostDetails idPost={idPost} imgAvatar={imgAvatar} caption={caption} like={like} username={username} url={imgAvatar} /> */}
            <button onClick={btnDisplay}>
              {comment}
              {close && (
                <PostDetails
                  idPost={post.id}
                  imgAvatar={post.photo.url}
                  caption={post.caption}
                  like={post.likes.total}
                  username={post.user.username}
                  url={post.photo.url}
                  comment={post.comments}
                />
              )}
            </button>
            <br />
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

HomeContent.prototype = {
  imgAvatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  idPost: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  like: PropTypes.string.isRequired,
  comment: PropTypes.array.isRequired,
  btnLike: PropTypes.string.isRequired,
};
export default HomeContent;
