import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

import { BackButton } from '../BackButton';

it('functions as a button', () => {
  const onPress = jest.fn();
  const output = render(<BackButton onPress={onPress} />);
  fireEvent(output.container, 'press');
  expect(onPress).toHaveBeenCalled();
});
