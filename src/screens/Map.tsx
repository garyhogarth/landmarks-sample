import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';

import colors from '../constants/colors';
import { MainStackParams } from '../navigation/Main';

type NavigationProp = StackNavigationProp<MainStackParams, 'Map'>;

export const Map = () => {
  const { navigate } = useNavigation<NavigationProp>();
  return (
    <View style={styles.container}>
      <Text>Map Screen</Text>
      <Button onPress={() => navigate('Landmark')}>Landmark Screen</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
});
