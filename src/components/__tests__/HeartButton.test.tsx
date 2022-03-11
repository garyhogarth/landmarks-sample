import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

import { HeartButton } from '../HeartButton';

it('functions as a button', () => {
  const onPress = jest.fn();
  const output = render(<HeartButton onPress={onPress} />);
  fireEvent(output.container, 'press');
  expect(onPress).toHaveBeenCalled();
});
