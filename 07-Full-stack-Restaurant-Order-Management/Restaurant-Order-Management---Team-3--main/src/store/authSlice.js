// store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: null, // { id, name, email, token? }
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload; // ensure payload is user object your backend returns
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export default authSlice.reducer;
export const { loginSuccess, logout } = authSlice.actions;
