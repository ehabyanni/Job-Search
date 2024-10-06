'use client';
import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './slices/jobSlice';
import searchReducer from './slices/searchSlice';
import jobDetailsReducer from './slices/jobDetailsSlice';
import skillDetailsReducer from './slices/skillDetailsSlice';

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    search: searchReducer,
    jobDetails: jobDetailsReducer,
    skillDetails: skillDetailsReducer
  }
});

export default store;

