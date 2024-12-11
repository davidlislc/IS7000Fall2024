import { configureStore } from '@reduxjs/toolkit';
import walletReducer from './walletSlice';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        wallet: walletReducer,
        user: userReducer,
    },
});

export default store;
