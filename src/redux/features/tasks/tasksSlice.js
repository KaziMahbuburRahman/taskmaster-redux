import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  tasks: [],
};
const tasksSlice = createSlice({
  name: "tasksSlice",
  initialState,
  reducers: {
    addTask: (state, action) => {
      if (state.tasks.length === 0) {
        state.tasks.push({ id: 1, status: "pending", ...action.payload });
      } else {
        state.tasks.push({ id: state.tasks.at(-1).id + 1, status: "pending", ...action.payload });
      }
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, removeTask } = tasksSlice.actions;

export default tasksSlice.reducer;
