import axios from 'axios';
import { loginFailed, loginStart, loginSuccess } from './AuthSilde';

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post('http://localhost:8080/api/auth/login', user);
    dispatch(loginSuccess(res.data));
    navigate('/');
  } catch (err) {
    dispatch(loginFailed());
  }
};

// export const postUpload = async (accessToken, formData, dispatch) => {
//   dispatch(loginStart());
//   try {
//     const res = await axios.post('http://localhost:8080/api/post/upload', {
//       headers: { token: `${accessToken}` },
//       formData: formData,
//     });
//     dispatch(loginSuccess(res.data.data));
//   } catch (err) {
//     dispatch(loginFailed());
//   }
// };
