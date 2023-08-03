import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./projectService";
import getCurrentDateTime from "../../../tools/datetime_helpers";
const initialState = {
  projects: null,
  project: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  request_name: "",
};
export const create_project = createAsyncThunk(
  "projects/create_project",
  async (project, thunkApi) => {
    try {
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
  "projects/get_projects",
  async (user_id, thunkApi) => {
    try {
      let response = await authService.get_projects(user_id);
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

export const delete_project = createAsyncThunk(
  "projects/delete_project",
  async (project_id, thunkApi) => {
    try {
      let response = await authService.delete_project(project_id);
      if (response.status === 200) {
        return response;
      } else if (response?.response.status !== 201) {
        return thunkApi.rejectWithValue(response);
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
    empty_request_name: (state) => {
      state.request_name = "";
    },
    set_project: (state, payload) => {
      state.project = payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(create_project.pending, (state, action) => {
        state.isLoading = true;
        state.request_name = "create_project";
        state.project = action.meta.arg;
        state.project["status"] = "Pending";
        state.project["createdAt"] = getCurrentDateTime();
      })
      .addCase(create_project.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.projects.data = [state.project, ...state.projects.data];
        state.project = "";
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
        state.projects = action.payload.data;
      })
      .addCase(get_projects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.projects = null;
        state.message = action.payload;
      })
      .addCase(delete_project.pending, (state) => {
        state.isLoading = true;
        state.request_name = "delete_project";
      })
      .addCase(delete_project.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.message = "Success";
        let dummy = [...state.projects.data];
        state.projects.data = dummy.filter((element) => {
          return element["project_id"] !== action.payload.data.project_id;
        });
      })
      .addCase(delete_project.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { reset, empty_request_name, set_project } = authSlice.actions;
