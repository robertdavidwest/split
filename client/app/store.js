import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import audioGridReducer from "../features/audioGrid/audioGridSlice";

const store = configureStore({
  reducer: { auth: authReducer, audioGrid: audioGridReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
export * from "../features/audioGrid/audioGridSlice";
