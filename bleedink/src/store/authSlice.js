import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
    dashboard: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
  },
});

export const { login, logout, dashboard } = authSlice.actions;
export default authSlice.reducer;
