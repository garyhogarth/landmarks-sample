import { render } from '@testing-library/react-native';
import React from 'react';

import { LandmarkScreen } from '../LandmarkScreen';

describe('Landmark', () => {
  it('renders the landmark screen', () => {
    const out = render(<LandmarkScreen />);

    out.getByText('Landmark Screen');
  });
});
