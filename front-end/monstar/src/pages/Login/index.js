import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { Routes, Route, Link } from 'react-router-dom';

import styles from './Login.module.scss';
import Register from '~/pages/Register';
import Footer from '~/pages/Footer';
import images from '~/assets/images';

const cx = classNames.bind(styles);
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    const config = {
      header: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    axios
      .post(
        'http://localhost:8080/api/auth/login',
        {
          username: username,
          password: password,
        },
        config,
      )

      .then((res) => {
        setMessage("You're logged in");
        navigate('/');
        console.log('data:  ' + res.data);
      })
      .then((res) => {
        console.log('status: ' + config);
      })
      .catch((error) => {
        setErrorMessage('Sorry, your password was incorrect. Please double-check your password.');
        console.log('Error: ' + error);
      });
  };

  return (
    <div>
      <div className={cx('login-main')}>
        <div className={cx('login-left')}>
          <img src={images.pic1} alt="" />
        </div>
        <div className={cx('login-right')}>
          <div className={cx('login-container')}>
            <img src={images.logo} alt="" />
            <br />
            <input
              type="text"
              placeholder="Phone number, username, or email"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <br />
            <input type="password" placeholder="Password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            <br />
            <button onClick={handleSubmitLogin}>Login</button>
            <div className={cx('flex-or')}>
              <div>
                <hr />
              </div>
              <div>OR</div>
              <div>
                <hr />
              </div>
            </div>
            <br />
            <a href="">Forgot password</a>
            <br />
            <label htmlFor=""></label>
            <p className="text-error" style={{ color: 'red', margin: '10px 35px' }}>
              {errorMessage}
            </p>
          </div>
          <div>
            <label htmlFor="">
              Don't have an account? <Link to="/Register">Sign up</Link>
            </label>
          </div>
          <div>
            <span>Get the app.</span>
            <div>
              <img src={images.pic2} alt="" />
              <img src={images.pic3} alt="" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
