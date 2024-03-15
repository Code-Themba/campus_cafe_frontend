import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import { apiSlice } from './features/apiSlice';
import cartSlice from './features/cartSlice';

export default configureStore({
    reducer:{
        auth: authSlice,
        cart: cartSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});