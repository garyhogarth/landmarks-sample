import { RootState } from './store';

export const getFavouriteLandmarkIds = (state: RootState) =>
  state.landmarks.favouriteLandmarkIds;

export const isLandmarkFavourited = (
  state: RootState,
  landmarkID: string,
): boolean => state.landmarks.favouriteLandmarkIds.indexOf(landmarkID) >= 0;
