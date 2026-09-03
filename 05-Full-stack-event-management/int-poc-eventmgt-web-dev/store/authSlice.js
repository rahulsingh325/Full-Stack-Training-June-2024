import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null, // sirf UI ke liye
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserEmail(state, action) {
      state.email = action.payload;
    },
    clearUser(state) {
      state.email = null;
    },
  },
});

export const { setUserEmail, clearUser } = authSlice.actions;
export default authSlice.reducer;
