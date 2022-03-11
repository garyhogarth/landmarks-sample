import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import colors from '../constants/colors';
import { RoundButton } from './RoundButton';

export type HeartButtonProps = {
  size?: number;
  onPress: () => void;
  active?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};
export const HeartButton = ({
  onPress,
  size = 64,
  active = false,
  containerStyle = {},
}: HeartButtonProps) => {
  return (
    <RoundButton
      size={size}
      onPress={onPress}
      containerStyle={containerStyle}
      hitSlop={size * 0.5}
    >
      <AntDesign
        name={active ? 'heart' : 'hearto'}
        size={size * 0.5}
        color={colors.secondary}
      />
    </RoundButton>
  );
};
