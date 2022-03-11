import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LandmarkState {
  favouriteLandmarkIds: string[];
}
const initialState: LandmarkState = {
  favouriteLandmarkIds: [],
};

export const landmarkSlice = createSlice({
  name: 'landmarks',
  initialState,
  reducers: {
    addFavouriteLandmark(state, action: PayloadAction<string>) {
      if (state.favouriteLandmarkIds.indexOf(action.payload) === -1) {
        state.favouriteLandmarkIds = [
          ...state.favouriteLandmarkIds,
          action.payload,
        ];
      }
    },
    removeFavouriteLandmark(state, action: PayloadAction<string>) {
      state.favouriteLandmarkIds = state.favouriteLandmarkIds.filter(
        favouriteLandmarkId => favouriteLandmarkId !== action.payload,
      );
    },
  },
});

export const { addFavouriteLandmark, removeFavouriteLandmark } =
  landmarkSlice.actions;
export default landmarkSlice.reducer;
