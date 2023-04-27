import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import styles from './Login.module.scss';
import Footer from '~/pages/Footer';
import images from '~/assets/images';
import { loginUser } from '~/redux/APIRequest';

const cx = classNames.bind(styles);
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);

    const config = {
      header: {
        'Content-Type': 'application/json',
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
        // setMessage("You're logged in");
        localStorage.setItem('token', res.data.data.access_token);
        navigate('/');
        console.log('Thanh cong!');
      })
      .catch((error) => {
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
            <form onSubmit={handleLogin}>
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
              <button type="submit">Login</button>
            </form>
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
              {/* {errorMessage} */}
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
