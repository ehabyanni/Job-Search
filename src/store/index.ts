import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './slices/jobSlice';
import searchReducer from './slices/searchSlice';
// import skillsReducer from './skillSlice';

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    search: searchReducer
    // skills: skillsReducer
  }
});

export default store;
