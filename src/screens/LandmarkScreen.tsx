import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import i18n from 'i18n-js';
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { RoundButton } from '../components/RoundButton';
import { Text } from '../components/Text';
import colors, { palette } from '../constants/colors';
import { MainStackParams } from '../navigation/Main';

export type Landmark = {
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

export const LandmarkScreen = () => {
  // Extract the route parameters
  const route = useRoute<LandmarkScreenRouteProp>();
  const { landmark } = route.params || {};

  const { goBack } = useNavigation<LandmarkScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {landmark ? (
        <>
          <SharedElement
            id={`landmark.${landmark.id}.photo`}
            style={styles.imageContainer}
          >
            <Image style={styles.image} source={{ uri: landmark.image }} />
          </SharedElement>
          <View style={styles.bottomContainer}>
            <RoundButton onPress={goBack} backgroundColor={palette.red} />
            <Text type="h1">{landmark.name}</Text>
            <Text>{landmark.description}</Text>
          </View>
        </>
      ) : (
        <View style={styles.errorContainer}>
          <Ionicons name="warning-outline" size={200} color={colors.error} />
          <Text type="error">{i18n.t('errors.landmark')}</Text>
          <Pressable style={styles.errorButton} onPress={goBack}>
            <Text type="error" style={styles.errorButtonText}>
              {i18n.t('actions.goBack')}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
  },
  image: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  bottomContainer: {
    paddingHorizontal: 16,
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    margin: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorButton: {
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.error,
    borderRadius: 12,
  },
  errorButtonText: {
    color: colors.textInverted,
  },
});
