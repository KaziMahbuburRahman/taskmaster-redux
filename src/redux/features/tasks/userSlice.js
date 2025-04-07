import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../utils/firebase.config";

const initialState = {
  name: "",
  email: "",
  uid: "",
  photoURL: "",
  isLoading: true,
  isError: false,
  error: "",
};

export const createUser = createAsyncThunk(
  "userSlice/createUser",
  async ({ name, email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: name,
    });

    const defaultPhotoURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=random`;

    // Store user information in Firestore
    await setDoc(doc(db, "users", data.user.uid), {
      displayName: name,
      email: email,
      uid: data.user.uid,
      photoURL: defaultPhotoURL,
      createdAt: new Date().toISOString(),
    });

    return {
      email: data.user.email,
      name: data.user.displayName,
      uid: data.user.uid,
      photoURL: defaultPhotoURL,
    };
  }
);

export const signInUser = createAsyncThunk(
  "userSlice/signInUser",
  async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return {
      email: data.user.email,
      name: data.user.displayName,
      uid: data.user.uid,
      photoURL:
        data.user.photoURL ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          data.user.displayName
        )}&background=random`,
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
      state.uid = action.payload.uid;
      state.photoURL = action.payload.photoURL;
      state.isLoading = false;
      state.isError = false;
      state.error = "";
    },
    toggleLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    logout: (state) => {
      state.name = "";
      state.email = "";
      state.uid = "";
      state.photoURL = "";
      state.isLoading = false;
      state.isError = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.email = "";
        state.name = "";
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.email = payload.email;
        state.name = payload.name;
        state.uid = payload.uid;
        state.photoURL = payload.photoURL;
        state.error = "";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        state.email = "";
        state.name = "";
        state.error = action.error.message;
      })
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.email = "";
        state.name = "";
        state.error = "";
      })
      .addCase(signInUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.email = payload.email;
        state.name = payload.name;
        state.uid = payload.uid;
        state.photoURL = payload.photoURL;
        state.error = "";
      })
      .addCase(signInUser.rejected, (state, action) => {
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
