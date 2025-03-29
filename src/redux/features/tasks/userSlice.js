import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  users: [
    {
      id: 1,
      name: "Mir Hussain",
      email: "mirhussain@gmail.com",
      password: "123456",
    },
  ],
};
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
});

export const { addTask, removeTask, updateStatus } = userSlice.actions;

export default userSlice.reducer;
