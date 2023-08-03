import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slicers/auth/authSlice";
import projectsReducer from "./slicers/projects/projectSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
  },
});
