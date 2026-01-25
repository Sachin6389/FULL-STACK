import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth.js'
import  Productreducer  from "./Product"

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: Productreducer,
  },
});

export default store;
