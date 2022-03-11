import { render } from '@testing-library/react-native';
import React from 'react';

import { Text } from '../Text';

it('renders text', () => {
  render(<Text type="h1">Test</Text>);
});
