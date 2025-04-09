import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../utils/firebase.config";

const initialState = {
  users: [],
  isLoading: false,
  isError: false,
  error: "",
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue, getState }) => {
    try {
      console.log("Starting to fetch users from Firestore...");
      const state = getState();
      const currentUserId = state.users.uid;

      if (!currentUserId) {
        throw new Error("No current user found");
      }

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "!=", currentUserId));
      console.log("Firestore query created with currentUserId:", currentUserId);

      const querySnapshot = await getDocs(q);
      console.log("Query snapshot received:", querySnapshot.size, "documents");

      const usersList = [];
      querySnapshot.forEach((doc) => {
        const userData = { id: doc.id, ...doc.data() };
        console.log("Processing user:", userData);
        usersList.push(userData);
      });

      console.log("Successfully fetched users:", usersList);
      return usersList;
    } catch (error) {
      console.error("Error fetching users:", error);
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        console.log("Fetch users pending...");
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log("Fetch users fulfilled:", action.payload);
        state.isLoading = false;
        state.isError = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        console.error("Fetch users rejected:", action.payload);
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
