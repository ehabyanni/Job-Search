'use client';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jobDetailsType } from "../../models/jobDetailsType";

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (cursor: number) => {
    const response = await axios.get(
      `https://skills-api-zeta.vercel.app/jobs?cursor=${cursor}&limit=12`
    );
    return response.data;
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [] as jobDetailsType[],
    status: "idle",
    cursor: 0,
    limit: 12,
    next: 12,
  },
  reducers: {
    incrementCursor: (state) => {
      state.cursor += state.limit;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Ensure no duplicates by using a Set
        const jobIds = new Set(state.jobs.map(job => job.id));
        const newJobs = action.payload.data.jobs.filter((job: jobDetailsType) => !jobIds.has(job.id));

        // Update state & next
        state.jobs = [...state.jobs, ...newJobs];
        state.next = action.payload.data.meta.next;
        
      })
      .addCase(fetchJobs.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { incrementCursor } = jobSlice.actions;

export default jobSlice.reducer;
