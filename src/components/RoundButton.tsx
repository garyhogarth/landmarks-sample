import React from 'react';
import {
  StyleSheet,
  Pressable,
  PressableProps,
  ColorValue,
} from 'react-native';

import colors from '../constants/colors';

type RoundButtonProps = PressableProps & {
  size?: number;
  backgroundColor?: ColorValue;
};

export const RoundButton = ({
  children,
  size = 64,
  backgroundColor = colors.background,
  ...pressableProps
}: RoundButtonProps) => {
  const styles = useStyles({ size, backgroundColor });
  return (
    <Pressable {...pressableProps} style={[styles.container, styles.shadow]}>
      {children}
    </Pressable>
  );
};

type RoundButtonStyleProps = {
  size: number;
  backgroundColor: ColorValue;
};
const useStyles = ({ size, backgroundColor }: RoundButtonStyleProps) => {
  return StyleSheet.create({
    container: {
      borderRadius: size / 2,
      width: size,
      height: size,
      backgroundColor,
    },
    shadow: {
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.2,
      shadowRadius: 5,
    },
  });
};
