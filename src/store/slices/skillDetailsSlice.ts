'use client';
import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import axios from 'axios';
import { SkillDetailsType } from '../../models/skillDetailsType';

// Fetch specific Skill details by ID
export const fetchSkillDetails = createAsyncThunk(
  'skills/fetchSkillDetails',
  async (id: string) => {
    const response = await axios.get(`https://skills-api-zeta.vercel.app/skill/${id}`);
    return response.data;
  }
);

const skillDetailsSlice = createSlice({
  name: 'skills',
  initialState: {
    skillDetails: {} as SkillDetailsType,
    status: 'idle',
    error: null as SerializedError | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkillDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSkillDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.skillDetails = action.payload.data.skill;
      })
      .addCase(fetchSkillDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  }
});

export default skillDetailsSlice.reducer;
