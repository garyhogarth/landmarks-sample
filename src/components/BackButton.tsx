import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import colors from '../constants/colors';
import { RoundButton } from './RoundButton';

export type BackButtonProps = {
  size?: number;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};
export const BackButton = ({
  onPress = () => {},
  size = 64,
  containerStyle = {},
}: BackButtonProps) => {
  return (
    <RoundButton
      size={size}
      onPress={onPress}
      containerStyle={containerStyle}
      hitSlop={size * 0.5}
      shadow
      testID="BackButton"
    >
      <Entypo name="chevron-thin-down" size={32} color={colors.primary} />
    </RoundButton>
  );
};
