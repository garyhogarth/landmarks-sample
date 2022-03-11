import React from 'react';

import landmarks from '../../../assets/londonLandmarks.json';
import { renderWithStore } from '../../utilities/renderWithStore';
import { LandmarkCard } from '../LandmarkCard';

it('works as a card', () => {
  const onPress = jest.fn();
  renderWithStore(<LandmarkCard landmark={landmarks[0]} onPress={onPress} />);
});
