import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slicers/auth/authSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
