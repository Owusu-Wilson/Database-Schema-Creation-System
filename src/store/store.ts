import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './slices/authSlice';
import projectReducer, { ProjectState } from './slices/projectSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
  },
});

// Define RootState and AppDispatch explicitly
export type RootState = {
  auth: AuthState;
  project: ProjectState;
};

export type AppDispatch = typeof store.dispatch;
