import { configureStore, combineReducers } from '@reduxjs/toolkit';
import LandmarksSlice from './LandmarksSlice';

export const rootReducer = combineReducers({
  landmarks: LandmarksSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
  reducer: rootReducer,
});
