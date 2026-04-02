import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user || null,
  loading: false,
};

// REGISTER
export const register = createAsyncThunk(
  "auth/register",
  async (data) => {
    const res = await API.post("/auth/register", data);
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  }
);

// LOGIN
export const login = createAsyncThunk("auth/login", async (data) => {
  const res = await API.post("/auth/login", data);
  localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
});

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;