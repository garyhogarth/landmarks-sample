import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

import { LandmarkScreen, useStyles } from '../LandmarkScreen';

const MOCK_LANDMARK = {
  id: '94459b01-7756-4a37-9458-8acab402ecb0',
  name: 'Big Ben',
  latlng: {
    latitude: 51.500782626551675,
    longitude: -0.12552662330828043,
  },
  description:
    'Big Ben is the nickname for the Great Bell of the striking clock at the north end of the Palace of Westminster; the name is frequently extended to also refer to the clock and the clock tower. The official name of the tower in which Big Ben is located was originally the Clock Tower; it was renamed Elizabeth Tower in 2012 to mark the Diamond Jubilee of Elizabeth II, Queen of the United Kingdom.',
  image:
    'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};

const mockedNavigate = jest.fn();
const mockedGoBack = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
      goBack: mockedGoBack,
    }),
    useRoute: () => ({
      params: { landmark: MOCK_LANDMARK },
    }),
  };
});

jest.mock('react-native-safe-area-context', () => {
  const actualNav = jest.requireActual('react-native-safe-area-context');
  return {
    ...actualNav,
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
    const { getAllByText, getByTestId } = render(<LandmarkScreen />);

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
