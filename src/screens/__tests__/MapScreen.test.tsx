import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import landmarks from '../../../assets/londonLandmarks.json';
import { renderWithStore } from '../../utilities/renderWithStore';

import { MapScreen } from '../MapScreen';

jest.mock('react-native-maps', () => {
  const ReactMock = require('react');
  const { View } = require('react-native');
  const MockMapView = ReactMock.forwardRef((props: any, ref: any) => {
    return (
      <View {...props} ref={ref}>
        {props.children}
      </View>
    );
  });
  const MockMarker = (props: any) => {
    return <View {...props}>{props.children}</View>;
  };
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
  };
});

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
    const { queryAllByA11yLabel } = renderWithStore(<MapScreen />);
    const markers = queryAllByA11yLabel('LandmarkMarker');

    // Press the first marker
    fireEvent(markers[0], 'press');
    expect(mockedNavigate).toHaveBeenCalledWith('Landmark', {
      landmark: landmarks[0],
    });
  });
  it('renders the all the landmark cards', () => {
    const { queryAllByA11yLabel } = renderWithStore(<MapScreen />);
    const cards = queryAllByA11yLabel('Landmark Card');
    // Press the first marker
    fireEvent(cards[0], 'press');
    expect(mockedNavigate).toHaveBeenCalledWith('Landmark', {
      landmark: landmarks[0],
    });
  });
});
