import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk(
  "loginuser",
  async (userCredentialsObject, thunkApi) => {
    let response = await axios.post(
      "https://localhost:4000/user/login",
      userCredentialsObject
    );
    let data = response.data;
    if (data.message === "Success") {
      const token = data.payload;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // console.log()
      localStorage.setItem("token", data.payload);
      return data.userobj;
    }
    if (
      data.message === "Invalid Password" ||
      data.message === "User not found"
    ) {
      return thunkApi.rejectWithValue(data);
    }
  }
);

let userSlice = createSlice({
  name: "user",
  initialState: {
    userobj: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    errMsg: "",
  },
  reducers: {
    clearLoginStatus: (state) => {
      state.userobj = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.errMsg = "";
      return state;
    },
  },
  extraReducers: {
    [userLogin.pending]: (state, action) => {
      state.isLoading = true;
    },
    [userLogin.fulfilled]: (state, action) => {
      state.userobj = action.payload;
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.errMsg = "";
      return state;
    },
    [userLogin.rejected]: (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.errMsg = action.payload.message;
    },
  },
});

export const {clearLoginStatus} = userSlice.actions
export default userSlice.reducer