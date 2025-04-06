import { configureStore } from "@reduxjs/toolkit";

import tasksSlice from "./features/tasks/tasksSlice";
import userSlice from "./features/tasks/userSlice";
import { tasksApi } from "./features/api/tasksApiSlice";
const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    tasks: tasksSlice,
    users: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware),
});

export default store;
