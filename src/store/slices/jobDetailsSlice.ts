import { createSlice, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import axios from 'axios';
import { jobDetailsType } from '../../models/jobDetailsType';

// Fetch specific job details by ID
export const fetchJobDetails = createAsyncThunk(
  'jobs/fetchJobDetails',
  async (id: string) => {
    const response = await axios.get(`https://skills-api-zeta.vercel.app/job/${id}`);
    return response.data;
  }
);

const jobDetailsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobDetails: {} as jobDetailsType,
    status: 'idle',
    error: null as SerializedError | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobDetails = action.payload.data.job;
      })
      .addCase(fetchJobDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  }
});

export default jobDetailsSlice.reducer;
