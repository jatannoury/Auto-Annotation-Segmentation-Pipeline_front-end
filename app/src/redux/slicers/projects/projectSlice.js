import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./projectService";
const initialState = {
  projects: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const create_project = createAsyncThunk(
  "projects/create",
  async (project, thunkApi) => {
    try {
      console.log(project);
      let response = await authService.create_project(project);
      if (response?.status === 201) {
        return thunkApi.fulfillWithValue("Project Created");
      } else if (response?.response.status !== 201) {
        return thunkApi.rejectWithValue(response.response.data.detail);
      }
    } catch (error) {
      const message =
        (error.response && error.response) || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const get_projects = createAsyncThunk(
  "projects/projects",
  async (user_id, thunkApi) => {
    try {
      let response = await authService.get_projects(user_id);
      console.log("==============>",response)
      if (response.status === 200) {
        return response;
      } else if (response?.response.status !== 201) {
        return thunkApi.rejectWithValue(response.response.data.detail);
      }
    } catch (error) {
      const message =
        (error.response && error.response) || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "projects",
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
      .addCase(create_project.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create_project.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(create_project.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(get_projects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(get_projects.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        console.log(action.payload)
        state.projects = action.payload.data;
      })
      .addCase(get_projects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.projects = null;
        state.message = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { reset } = authSlice.actions;
