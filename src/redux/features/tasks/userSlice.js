import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import auth from "../../../utils/firebase.config";

const initialState = {
  name: "",
  email: "",
  isLoading: true,
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
    // console.log(data);
    return data;
  }
);
export const signInUser = createAsyncThunk(
  "userSlice/signInUser",
  async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    console.log(data);
    return {
      email: data.user.email,
      name: data.user.displayName,
      uid: data.user.uid,
      // Add any other serializable fields you need
    };
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.displayName;
      state.email = action.payload.email;
      state.isLoading = false;
    },
    toggleLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    logout: (state) => {
      state.name = "";
      state.email = "";
      state.isLoading = false;
    },
  },
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
    builder.addCase(signInUser.pending, (state) => {
      // Add user to the state array
      state.isLoading = true;
      state.isError = false;
      state.email = "";
      state.name = "";
      state.error = "";
    }),
      builder.addCase(signInUser.fulfilled, (state, { payload }) => {
        // Add user to the state array
        state.isLoading = false;
        state.isError = false;
        state.email = payload.email;
        state.name = payload.name;
        state.error = "";
      }),
      builder.addCase(signInUser.rejected, (state, action) => {
        // Add user to the state array
        state.isLoading = true;
        state.isError = true;
        state.email = "";
        state.name = "";
        state.error = action.error.message;
      });
  },
});

export const { setUser, toggleLoading, logout } = userSlice.actions;
export default userSlice.reducer;
