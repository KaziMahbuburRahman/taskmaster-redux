import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "../../../utils/firebase.config";

const initialState = {
  name: "",
  email: "",
  isLoading: false,
  isError: false,
  error: "",
};

export const createUser = createAsyncThunk(
  "userSlice/createUser",
  async ({ name, email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    updateProfile(auth.currentUser, {
      displayName: name,
    });
    console.log(data);
    return data;
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(createUser.pending, (state) => {
      // Add user to the state array
      state.isLoading = true;
      state.isError = false;
      state.email = "";
      state.name = "";
      state.error = "";
    }),
      builder.addCase(createUser.fulfilled, (state, { payload }) => {
        // Add user to the state array
        state.isLoading = false;
        state.isError = false;
        state.email = payload.email;
        state.name = payload.name;
        state.error = "";
      }),
      builder.addCase(createUser.rejected, (state, action) => {
        // Add user to the state array
        state.isLoading = true;
        state.isError = true;
        state.email = "";
        state.name = "";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
