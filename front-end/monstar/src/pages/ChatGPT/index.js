import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import HomeContent from '~/components/Layout/DefaultLayout/HomeLayout/Content';
import PropTypes from 'prop-types';

import images from '~/assets/images';
import styles from './ChatGPT.module.scss';
import * as request from '~/utils/requests';

const cx = classNames.bind(styles);

function ChatGPT() {
  const token = localStorage.getItem('token');
  const [chatgpt, setGPT] = useState('');
  const [dataPosts, setDataPosts] = useState([]);

  const inputRef = useRef();

  function searchGPT() {
    axios
      // .get(`http://localhost:8080/api/search?query=${encodeURI(chatgpt)}
      .post(
        `http://localhost:8080/api/user/gpt?token=c2stSnFVc1JPUmVZNnJvcXdkTTZvN1FUM0JsYmtGSjM3VERNQ2dFUEoxc1pvV0ZBeUdP`,
        {
          query: chatgpt,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      )
      .then((res) => setDataPosts(res.data.data.messsage))
      .then((res) => console.log('thanhcong'))
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className={cx('chatgpt')}>
      <h1>ChatGPT</h1>
      <div>
        <input ref={inputRef} type="text" placeholder="Send a message..." value={chatgpt} onChange={(e) => setGPT(e.target.value)} />
        <button
          className={cx('btn-clear')}
          onClick={() => {
            setGPT('');
            inputRef.current.focus();
          }}
        >
          {!!chatgpt && <img src={images.iconCloseB} alt="Like" />}
        </button>
        <button onClick={searchGPT} className={cx('btn-search')}>
          Submit
        </button>
      </div>
      <div className={cx('data-gpt')}>
        {!!dataPosts && <img src={images.iconGPT} alt="Like" />}
        {dataPosts}
      </div>
    </div>
  );
}

export default ChatGPT;
