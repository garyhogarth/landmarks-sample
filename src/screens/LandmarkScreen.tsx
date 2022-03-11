import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import i18n from 'i18n-js';
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';
import { BackButton } from '../components/BackButton';
import { HeartButton } from '../components/HeartButton';
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
  const styles = useStyles();
  const route = useRoute<LandmarkScreenRouteProp>();
  const { landmark } = route.params || {};

  const { goBack } = useNavigation<LandmarkScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {landmark ? (
        <>
          <SharedElement
            id={`landmark.${landmark.id}.heart`}
            style={styles.heartButton}
          >
            <HeartButton onPress={() => {}} size={54} />
          </SharedElement>
          <SharedElement
            id={`landmark.${landmark.id}.photo`}
            style={styles.imageContainer}
          >
            <Image style={styles.image} source={{ uri: landmark.image }} />
          </SharedElement>
          <View style={styles.bottomContainer}>
            <SharedElement
              id={`landmark.${landmark.id}.actionButton`}
              style={styles.backButton}
            >
              <BackButton onPress={goBack} />
            </SharedElement>
            <Text type="h1">{landmark.name}</Text>
            <Text>{landmark.description}</Text>
          </View>
          {/* The following element is hidden and scaled down, so that the shared element transitions nicely rather than popping in */}
          {/* There is probably a nicer way of doing this using react-native-shared-transisition */}
          <SharedElement
            id={`landmark.${landmark.id}.name`}
            style={styles.landmarkNameOffScreen}
          >
            <Text type="h2" style={styles.landmarkNameOffscreenText}>
              {landmark.name}
            </Text>
          </SharedElement>
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

const useStyles = () => {
  const insets = useSafeAreaInsets();
  return StyleSheet.create({
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
      paddingVertical: 32,
      flex: 1,
    },
    backButton: {
      position: 'absolute',
      top: -32,
      right: 16,
    },
    heartButton: {
      position: 'absolute',
      top: insets.top + 16,
      right: 16,
      zIndex: 100,
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
    landmarkNameOffScreen: {
      opacity: 0,
      position: 'absolute',
      bottom: -100,
    },
    landmarkNameOffscreenText: {
      color: colors.textInverted,
      textAlignVertical: 'bottom',
    },
  });
};
