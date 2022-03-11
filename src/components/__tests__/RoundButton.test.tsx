import { render } from '@testing-library/react-native';
import React from 'react';

import { RoundButton } from '../RoundButton';

it('functions as a button', () => {
  const onPress = jest.fn();
  render(<RoundButton onPress={onPress}>Press Me</RoundButton>);
});
