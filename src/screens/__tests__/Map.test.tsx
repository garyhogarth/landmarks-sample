import React from 'react';
import { render } from '@testing-library/react-native';

import { Map } from '../Map';

describe('Map', () => {
  it('renders the map screen', () => {
    const out = render(<Map />);

    out.getByText('Map Screen');
  });
});
