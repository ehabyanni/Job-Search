import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './slices/jobSlice';
// import skillsReducer from './skillSlice';

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    // skills: skillsReducer
  }
});

export default store;
