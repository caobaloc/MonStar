import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';

import styles from './Register.module.scss';
import Footer from '~/pages/Footer';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const Register = () => {
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirm, setPassword_confirm] = useState('');
  const navigate = useNavigate();

  const handleSubmitRegister = (event) => {
    event.preventDefault();
    const config = {
      header: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    axios
      .post(
        'http://localhost:8080/api/auth/register',
        {
          first_name: first_name,
          last_name: last_name,
          username: username,
          email: email,
          gender: gender,
          password: password,
          password_confirm: password_confirm,
        },
        config,
      )
      .then((response) => {
        navigate('/Login');
        console.log('Registered: ' + response.data.error);
      })
      .catch((error) => {
        console.log('Error: ' + error);
      });
  };

  return (
    <div style={{ paddingTop: '20px' }}>
      <div className={cx('register-main')}>
        <div className={cx('register-container')}>
          <img src={images.logo} alt="" />
          <h3>Sign up to see photos and videos from your friends.</h3>
          <input type="text" placeholder="Mobile Number or Email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <input type="text" placeholder="First Name" value={first_name} onChange={(event) => setFirst_name(event.target.value)} />
          <input type="text" placeholder="Last Name" value={last_name} onChange={(event) => setLast_name(event.target.value)} />
          <input type="text" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
          <input type="text" placeholder="Gender" value={gender} onChange={(event) => setGender(event.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <input
            type="password"
            placeholder="Confirm Password"
            value={password_confirm}
            onChange={(event) => setPassword_confirm(event.target.value)}
          />
          <span htmlFor="">
            People who use our service may have uploaded <br /> your contact information to Instagram.]
            <a href="https://www.facebook.com/help/instagram/261704639352628"> Learn More.</a>
          </span>
        </div>
        <div>
          <label htmlFor="">
            By signing up, you agree to our
            <a href="https://help.instagram.com/581066165581870/?locale=en_US"> Terms</a>
            <a href="https://www.facebook.com/privacy/policy"> Privacy Policy</a> and <br />
            <a href="https://help.instagram.com/1896641480634370/"> Cookies Policy</a>
          </label>{' '}
          <br />
          <button onClick={handleSubmitRegister}>Sign up</button>
          <br />
        </div>
        <div>
          <label htmlFor="">
            Have an account? <Link to="/Login">Log in</Link>
          </label>
        </div>
        <div>
          <span>Get the app.</span>
          <div>
            <img src="/images/app.png" alt="" />
            <img src="/images/play.png" alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
