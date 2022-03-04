import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
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

type LandmarkScreenProps = {
  route: RouteProp<MainStackParams, 'Landmark'>;
  navigation: StackNavigationProp<MainStackParams, 'Landmark'>;
};

export const Landmark = ({ route, navigation }: LandmarkScreenProps) => {
  const { landmark } = route.params || {};
  if (!landmark) {
    return null;
  }
  return (
    <View style={styles.container}>
      <SharedElement id={`landmark.${landmark.id}.photo`}>
        <Image style={styles.image} source={{ uri: landmark.image }} />
      </SharedElement>
      <Button onPress={navigation.goBack}>Go Back</Button>

      <SharedElement id={`landmark.${landmark.id}.name`}>
        <Text>{landmark.name}</Text>
      </SharedElement>
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
