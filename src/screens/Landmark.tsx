import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../constants/colors';

export const Landmark = () => (
  <View style={styles.container}>
    <Text>Landmark Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
});
