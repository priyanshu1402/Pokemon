import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./Reducer/apiReducer";


export const store = configureStore({
    reducer: {
      api: apiReducer,
    },
  });