import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

import { LandmarkHeartButton } from '../LandmarkHeartButton';

it('functions as a button', () => {
  const onPress = jest.fn();
  const output = render(<LandmarkHeartButton />);
  fireEvent(output.container, 'press');
  expect(onPress).toHaveBeenCalled();
});
