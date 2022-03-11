import React from 'react';
import { StyleProp, StyleSheet, Text as RNText, TextStyle } from 'react-native';

import colors from '../constants/colors';

type TextProps = {
  type?: 'h1' | 'h2' | 'error';
  header?: boolean;
  children: string;
  style?: StyleProp<TextStyle>;
};

export const Text = ({ type, children, style }: TextProps) => {
  let textStyles: StyleProp<TextStyle>[] = [styles.text];

  if (type === 'h1') {
    textStyles.push(styles.h1Text);
  } else if (type === 'h2') {
    textStyles.push(styles.h2Text);
  } else if (type === 'error') {
    textStyles.push(styles.errorText);
  }

  return <RNText style={[...textStyles, style]}>{children}</RNText>;
};

const styles = StyleSheet.create({
  text: {
    color: colors.text,
    fontSize: 16,
    fontFamily: 'Arial',
  },
  h1Text: {
    fontWeight: 'bold',
    fontSize: 50,
  },
  h2Text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.error,
    textAlign: 'center',
  },
});
