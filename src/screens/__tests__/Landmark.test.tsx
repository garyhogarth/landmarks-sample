import React from 'react';
import { render } from '@testing-library/react-native';

import { Landmark } from '../Landmark';

describe('Landmark', () => {
  it('renders the landmark screen', () => {
    const out = render(<Landmark />);

    out.getByText('Landmark Screen');
  });
});
