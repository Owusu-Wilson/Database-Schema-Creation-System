import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../../types';

interface ProjectState {
  currentProject: Project | null;
}

const initialState: ProjectState = {
  currentProject: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setCurrentProject(state, action: PayloadAction<Project>) {
      state.currentProject = action.payload;
    },
  },
});
export type { ProjectState };

export const { setCurrentProject } = projectSlice.actions;
export default projectSlice.reducer;
