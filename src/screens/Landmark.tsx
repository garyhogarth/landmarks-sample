import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import i18n from 'i18n-js';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

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

export type LandmarkScreenRouteProp = RouteProp<MainStackParams, 'Landmark'>;
export type LandmarkScreenNavigationProp = StackNavigationProp<
  MainStackParams,
  'Landmark'
>;

export const Landmark = () => {
  // Extract the route parameters
  const route = useRoute<LandmarkScreenRouteProp>();
  let { landmark } = route.params || {};
  // landmark = null;

  const { goBack } = useNavigation<LandmarkScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {landmark ? (
        <>
          <SharedElement
            id={`landmark.${landmark.id}.photo`}
            style={styles.topContainer}
          >
            <Image style={styles.image} source={{ uri: landmark.image }} />
          </SharedElement>
          <View style={styles.bottomContainer}>
            <Button onPress={goBack}>Go Back</Button>
            <Text>{landmark.name}</Text>
            <Text>{landmark.description}</Text>
          </View>
        </>
      ) : (
        <>
          <Button onPress={goBack}>Go Back</Button>
          <Ionicons name="warning-outline" size={200} color={colors.red} />
          <Text>{i18n.t('errors.landmark')}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    width: '100%',
  },
  bottomContainer: {
    flex: 1,
  },
});
