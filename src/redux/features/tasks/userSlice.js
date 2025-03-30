import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      id: 1,
      name: "Mir Hussain",
      email: "mirhussain@gmail.com",
      password: "123456",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      role: "admin",
    },
    {
      id: 2,
      name: "Mezba Abedin",
      email: "mezba@gmail.com",
      password: "123456",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      role: "user",
    },
    {
      id: 3,
      name: "Rahatul Islam",
      email: "rahat@gmail.com",
      password: "123456",
      avatar:
        "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      role: "user",
    },
  ],
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        state.currentUser = user;
        state.isAuthenticated = true;
        localStorage.setItem("currentUser", JSON.stringify(user));
        localStorage.setItem("isAuthenticated", "true");
      }
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem("currentUser");
      localStorage.removeItem("isAuthenticated");
    },
    addUser: (state, action) => {
      const newUser = {
        id: state.users.length + 1,
        ...action.payload,
        role: "user",
      };
      state.users.push(newUser);
    },
    updateUser: (state, action) => {
      const { id, ...updates } = action.payload;
      const user = state.users.find((u) => u.id === id);
      if (user) {
        Object.assign(user, updates);
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { login, logout, addUser, updateUser, deleteUser } =
  userSlice.actions;

export default userSlice.reducer;
