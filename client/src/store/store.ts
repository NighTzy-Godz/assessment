import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import { userApi } from "./userApi";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export type StoreState = ReturnType<typeof rootReducer>;

export default store;
