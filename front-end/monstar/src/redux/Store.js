import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSilde';

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
