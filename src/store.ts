import { configureStore } from "@reduxjs/toolkit";
import { userApiSlice } from "./api/userApiSlice";

const store = configureStore({
  reducer: {
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApiSlice.middleware),
  devTools: true,
});

export default store;