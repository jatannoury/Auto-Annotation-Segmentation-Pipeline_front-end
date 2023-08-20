import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import predictionService from "./predictionService";
import getCurrentDateTime from "../../../tools/datetime_helpers";
const initialState = {
  data: null,
  request_name: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const instant_prediction = createAsyncThunk(
  "prediction/instant_prediction",
  async (image, thunkApi) => {
    try {
      let response = await predictionService.instant_prediction(image);
      if (response?.status === 201) {
        return thunkApi.fulfillWithValue(response);
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
export const instant_batch_prediction = createAsyncThunk(
  "prediction/instant_batch_prediction",
  async (images, thunkApi) => {
    try {
      let response = await predictionService.instant_batch_prediction(images);

      if (response?.status === 201) {
        return thunkApi.fulfillWithValue(response);
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

export const predictionSlice = createSlice({
  name: "prediction",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
      state.request_name = "";
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(instant_prediction.pending, (state, action) => {
        state.isLoading = true;
        state.request_name = "instant_prediction";
      })
      .addCase(instant_prediction.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(instant_prediction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(instant_batch_prediction.pending, (state, action) => {
        state.isLoading = true;
        state.request_name = "instant_batch_prediction";
      })
      .addCase(instant_batch_prediction.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(instant_batch_prediction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default predictionSlice.reducer;
export const { reset, empty_request_name, set_project } =
  predictionSlice.actions;
