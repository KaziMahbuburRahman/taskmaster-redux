import { configureStore } from "@reduxjs/toolkit";

import { tasksApi } from "./features/api/tasksApiSlice";
import tasksSlice from "./features/tasks/tasksSlice";
import userSlice from "./features/tasks/userSlice";
import usersSlice from "./features/tasks/usersSlice";

const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    tasks: tasksSlice,
    users: userSlice,
    allUsers: usersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware),
});

export default store;
