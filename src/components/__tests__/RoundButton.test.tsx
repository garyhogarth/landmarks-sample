import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

import { RoundButton } from '../RoundButton';

it('functions as a button', () => {
  const onPress = jest.fn();
  const output = render(<RoundButton onPress={onPress}>Press Me</RoundButton>);
  fireEvent(output.container, 'press');
  expect(onPress).toHaveBeenCalled();
});
