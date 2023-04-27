import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import HomeContent from '~/components/Layout/DefaultLayout/HomeLayout/Content';
import PropTypes from 'prop-types';

import images from '~/assets/images';
import styles from './Search.module.scss';
import * as request from '~/utils/requests';

const cx = classNames.bind(styles);

function SearchAccount() {
  const token = localStorage.getItem('token');
  const [searchIp, setSearch] = useState('');
  const [dataPosts, setDataPosts] = useState([]);

  const inputRef = useRef();

  function search() {
    axios
      .get(`http://localhost:8080/api/search?query=${encodeURI(searchIp)}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => setDataPosts(res.data.data.posts))
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className={cx('search')}>
      <h1>Search</h1>
      <div>
        <input ref={inputRef} type="text" placeholder="Search" value={searchIp} onChange={(e) => setSearch(e.target.value)} />
        <button
          className={cx('btn-clear')}
          onClick={() => {
            setSearch('');
            inputRef.current.focus();
          }}
        >
          {!!searchIp && <img src={images.iconCloseB} alt="Like" />}
        </button>
        <button onClick={search} className={cx('btn-search')}>
          Submit
        </button>
      </div>
      <div>
        {dataPosts.map((index) => {
          return (
            <HomeContent
              key={index.id}
              idPost={index.id}
              username={index.user.username}
              imgAvatar={index.photo.url}
              like={index.likes.total == 0 ? (index.likes.total = '0 like') : index.likes.total + ' likes'}
              time={index.photo.created_at}
              caption={index.caption}
              comment={index.comments.total == '0' ? 'No comment' : `View all ${index.comments.total} comments`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SearchAccount;
