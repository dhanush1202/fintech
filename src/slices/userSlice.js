import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk(
  "loginuser",
  async (userCredentialsObject, thunkApi) => {
    try {
      let response = await axios.post(
        "http://localhost:4000/user/login",
        userCredentialsObject
      );
      let data = response.data;
      
      if (data.message === "Success") {
        const token = data.payload;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", data.payload);
        return data.userobj;
      }
      
      if (
        data.message === "Invalid Password" ||
        data.message === "User not found"
      ) {
        return thunkApi.rejectWithValue(data);
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
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
      state.userobj = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.errMsg = "";
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
    },
    [userLogin.rejected]: (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.errMsg = action.payload.message || "An error occurred.";
    },
  },
});

export const { clearLoginStatus } = userSlice.actions;
export default userSlice.reducer;
