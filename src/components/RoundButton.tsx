import React from 'react';
import {
  StyleSheet,
  Pressable,
  PressableProps,
  ColorValue,
  StyleProp,
  ViewStyle,
} from 'react-native';

import colors from '../constants/colors';

type RoundButtonProps = PressableProps & {
  size?: number;
  backgroundColor?: ColorValue;
  shadow?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

export const RoundButton = ({
  children,
  size = 64,
  backgroundColor = colors.background,
  containerStyle = {},
  shadow = false,
  ...pressableProps
}: RoundButtonProps) => {
  const styles = useStyles({ size, backgroundColor });

  let containerStyles: StyleProp<ViewStyle>[] = [styles.container];

  if (shadow) {
    containerStyles.push(styles.shadow);
  }
  containerStyles.push(containerStyle);

  return (
    <Pressable {...pressableProps} style={containerStyles}>
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
      alignItems: 'center',
      justifyContent: 'center',
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
