import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';

import colors from '../constants/colors';
import { MainStackParams } from '../navigation/Main';

export type LandmarkRecord = {
  id: string;
  name: string;
  latlng: {
    latitude: number;
    longitude: number;
  };
  description: string;
  image: string;
};
type LandmarkScreenRouteProp = RouteProp<MainStackParams, 'Landmark'>;
type LandmarkNavigationProp = StackNavigationProp<MainStackParams, 'Landmark'>;

export const Landmark = () => {
  const { goBack } = useNavigation<LandmarkNavigationProp>();
  const { params } = useRoute<LandmarkScreenRouteProp>();
  const { landmark } = params || {};
  if (!landmark) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: landmark.image }} />
      <Button onPress={goBack}>Go Back</Button>
      <Text>{landmark.name}</Text>
      <Text>{landmark.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    height: 400,
    width: '100%',
  },
});
