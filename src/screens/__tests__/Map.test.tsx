import React from 'react';
import { render } from '@testing-library/react-native';

import { Map } from '../Map';

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
  it('renders the map screen', () => {
    render(<Map />);
  });
});
