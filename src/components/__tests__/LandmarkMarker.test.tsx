import { render } from '@testing-library/react-native';
import React from 'react';

import landmarks from '../../../assets/londonLandmarks.json';
import { LandmarkMarker } from '../LandmarkMarker';

it('works as a card', () => {
  const onPress = jest.fn();
  render(
    <LandmarkMarker landmark={landmarks[0]} active={false} onPress={onPress} />,
  );
});
