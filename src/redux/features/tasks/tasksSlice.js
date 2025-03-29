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
        state.tasks.push({ id: 1, ...action.payload });
      } else {
        state.tasks.push({ id: state.tasks.at(-1).id + 1, ...action.payload });
      }
    },
  },
});

export const { addTask } = tasksSlice.actions;

export default tasksSlice.reducer;
