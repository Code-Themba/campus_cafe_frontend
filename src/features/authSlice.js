import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null, 
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.userData = action.payload;
            localStorage.setItem('userData', JSON.stringify(action.payload));
        },
        logoutUser: (state, action) => {
            state.userData = null;
            localStorage.removeItem('userData');
        },
    }
})

export const {loginUser, logoutUser} = authSlice.actions;

export default authSlice.reducer;