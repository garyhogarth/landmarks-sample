import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import landmarks from '../../../assets/londonLandmarks.json';
import {
  addFavouriteLandmark,
  removeFavouriteLandmark,
} from '../../state/LandmarksSlice';
import { renderWithStore } from '../../utilities/renderWithStore';

import { LandmarkHeartButton } from '../LandmarkHeartButton';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch,
  };
});

it('functions as a button and adds a favourite', () => {
  const { queryByA11yRole } = renderWithStore(
    <LandmarkHeartButton landmark={landmarks[0]} />,
  );
  const button = queryByA11yRole('button');
  button && fireEvent(button, 'press');
  expect(mockDispatch).toBeCalledWith(addFavouriteLandmark(landmarks[0].id));
});

it('functions as a button and removes a favourite', () => {
  mockDispatch.mockReset();
  const { queryByA11yRole } = renderWithStore(
    <LandmarkHeartButton landmark={landmarks[0]} />,
    {
      landmarks: {
        favouriteLandmarkIds: [landmarks[0].id],
      },
    },
  );
  const button = queryByA11yRole('button');
  button && fireEvent(button, 'press');
  expect(mockDispatch).toBeCalledWith(removeFavouriteLandmark(landmarks[0].id));
});
