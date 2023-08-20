import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectService from "./projectService";
import { getCurrentDateTime } from "../../../tools/datetime_helpers";
const storedProjects = JSON.parse(localStorage.getItem("projects"));

const initialState = {
  projects: storedProjects || null,
  project: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
  request_name: "",
};
export const create_project = createAsyncThunk(
  "projects/create_project",
  async (project, thunkApi) => {
    try {
      let response = await projectService.create_project(project);
      if (response?.status === 201) {
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
export const start_project = createAsyncThunk(
  "projects/start_project",
  async (project, thunkApi) => {
    try {
      let response = await projectService.start_project(project);
      if (response?.status === 201) {
        return thunkApi.fulfillWithValue("Project Started");
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
      let response = await projectService.get_projects(user_id);
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
      let response = await projectService.delete_project(project_id);
      if (response.status === 200) {
        return response;
      }
      return thunkApi.rejectWithValue(response);
    } catch (error) {
      const message =
        (error.response && error.response) || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const authenticate_project = createAsyncThunk(
  "projects/authenticate_project",
  async (info, thunkApi) => {
    try {
      let response = await projectService.authenticate_project(
        info["project_id"],
        info["password"]
      );

      if (response.data["message"] === "Correct credentials") {
        return thunkApi.fulfillWithValue("Authenticated");
      } else if (response?.response.status !== 200) {
        return thunkApi.rejectWithValue(response);
      }
    } catch (error) {
      const message =
        (error.response && error.response) || error.message || error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = null;
      state.request_name = "";
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

        state.project = action.payload.data.project_info;
        state.projects.data = [state.project, ...state.projects.data];
        const storedProjects = localStorage.setItem(
          "projects",
          JSON.stringify(state.projects)
        );

        state.projects.items_count += 1;
        state.project = "";
      })
      .addCase(create_project.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(start_project.pending, (state, action) => {
        state.isLoading = true;
        state.request_name = "start_project";
        // state.project = action.meta.arg;
      })
      .addCase(start_project.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(start_project.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(get_projects.pending, (state) => {
        state.isLoading = true;
        state.request_name = "get_project";
      })
      .addCase(get_projects.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;

        state.projects = action.payload.data;
        localStorage.setItem("projects", JSON.stringify(action.payload.data));
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
        state.projects.items_count -= 1;
        state.projects.data = dummy.filter((element) => {
          return element["project_id"] !== action.payload.data.project_id;
        });
      })
      .addCase(delete_project.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(authenticate_project.pending, (state) => {
        state.isLoading = true;
        state.request_name = "authenticate_project";
      })
      .addCase(authenticate_project.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.message = "Success";
      })
      .addCase(authenticate_project.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;

        state.message = "Failed";
      });
  },
});

export default projectSlice.reducer;
export const { reset, empty_request_name, set_project } = projectSlice.actions;
