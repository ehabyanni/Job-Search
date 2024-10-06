import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './slices/jobSlice';
import searchReducer from './slices/searchSlice';
import jobDetailsReducer from './slices/jobDetailsSlice';

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    search: searchReducer,
    jobDetails: jobDetailsReducer,
  }
});

export default store;

