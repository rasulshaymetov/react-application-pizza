import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import countReducer from "./slices/filterSlice";
export const store = configureStore({
  reducer: {
    filter
  },
});
