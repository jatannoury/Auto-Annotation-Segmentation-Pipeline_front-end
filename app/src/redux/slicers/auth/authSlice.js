import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: storedUser || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const register = createAsyncThunk(
  "auth/regsiter",
  async (user, thunkApi) => {
    try {
      let response = await authService.register(user);
      if (response.status !== 201) {
        return thunkApi.rejectWithValue(response.response.data.detail);
      }
    } catch (error) {
      const message =
        (error.response && error.response) || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const login = createAsyncThunk("auth/login", async (user, thunkApi) => {
  try {
    let response = await authService.login(user);
    if (response.status !== 200) {
      return thunkApi.rejectWithValue(response.response.data.message);
    }
    return response;
  } catch (error) {
    const message =
      (error.response && error.response?.message) ||
      error.message ||
      error.toString();
    return thunkApi.rejectWithValue(message);
  }
});
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.user = action.payload.data.user_info[0];
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.data.user_info[0])
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { reset } = authSlice.actions;
