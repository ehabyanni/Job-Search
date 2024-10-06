'use client';
import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";
import { jobDetailsType } from "../../models/jobDetailsType";

// Fetch search results based on query
export const fetchSearchResults = createAsyncThunk(
  "jobs/fetchSearchResults",
  async (query: string) => {
    const response = await axios.get(
      `https://skills-api-zeta.vercel.app/jobs/search?query=${query.toLowerCase()}`
    );
    return response.data;
  }
);

const searchSlice = createSlice({
  name: "jobSearch",
  initialState: {
    jobSearchResults: [] as jobDetailsType[],
    status: "idle",
    error: null as SerializedError | null,
  },
  reducers: {
    resetJobSearchResults: (state) => {
      state.jobSearchResults = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobSearchResults = action.payload.data.jobs;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const { resetJobSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
