import { fireEvent } from '@testing-library/react-native';
import React from 'react';

import { renderWithStore } from '../../utilities/renderWithStore';
import { LandmarkScreen, useStyles } from '../LandmarkScreen';

const mockedNavigate = jest.fn();
const mockedGoBack = jest.fn();
jest.mock('@react-navigation/native', () => {
  const landmarks = require('../../../assets/londonLandmarks.json');
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
      goBack: mockedGoBack,
    }),
    useRoute: () => ({
      params: { landmark: landmarks[0] },
    }),
  };
});

jest.mock('react-native-safe-area-context', () => {
  return {
    ...jest.requireActual('react-native-safe-area-context'),
    useSafeAreaInsets: () => ({
      top: 1,
      bottom: 2,
      left: 3,
      right: 4,
    }),
  };
});

describe('Landmark', () => {
  it('renders the landmark screen', () => {
    const { getAllByText, getByTestId } = renderWithStore(<LandmarkScreen />);

    const bigBen = getAllByText('Big Ben');
    expect(bigBen.length).toEqual(2);

    const backButton = getByTestId('BackButton');
    fireEvent(backButton, 'press');
    expect(mockedGoBack).toHaveBeenCalledTimes(1);
  });
});
describe('Landmark styles', () => {
  it('renders the landmark screen', () => {
    const styles = useStyles();

    styles.heartButton.top = 17; // 1 (from mock) + 16
  });
});
