import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeartButton, HeartButtonProps } from '../components/HeartButton';
import { Landmark } from '../screens/LandmarkScreen';
import { isLandmarkFavourited } from '../state/LandmarksSelectors';
import {
  addFavouriteLandmark,
  removeFavouriteLandmark,
} from '../state/LandmarksSlice';
import { RootState } from '../state/store';

export type LandmarkHeartButtonProps = Omit<HeartButtonProps, 'onPress'> & {
  landmark: Landmark;
};
export const LandmarkHeartButton = ({
  landmark,
  ...rest
}: LandmarkHeartButtonProps) => {
  // Connect to the redux state
  const dispatch = useDispatch();
  const isFavourited =
    useSelector((state: RootState) =>
      isLandmarkFavourited(state, landmark?.id ?? ''),
    ) ?? false;
  const toggleFavourite = () => {
    if (landmark) {
      dispatch(
        isFavourited
          ? removeFavouriteLandmark(landmark.id)
          : addFavouriteLandmark(landmark.id),
      );
    }
  };
  return (
    <HeartButton {...rest} onPress={toggleFavourite} active={isFavourited} />
  );
};
