import { render } from '@testing-library/react-native';
import React from 'react';

import { MapScreen } from '../MapScreen';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('Map', () => {
  it('renders the all the landmark markers', () => {
    render(<MapScreen />);
  });
});
