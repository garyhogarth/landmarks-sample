import React from 'react';
import { Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { Text } from '../components/Text';

import colors from '../constants/colors';
import { LandmarkHeartButton } from '../containers/LandmarkHeartButton';
import { Landmark } from '../screens/LandmarkScreen';
import { BackButton } from './BackButton';

const { width } = Dimensions.get('screen');

export const LANDMARK_CARD_WIDTH = width * 0.75;
export const LANDMARK_CARD_HEIGHT = 150;
export const LANDMARK_CARD_MARGIN = 32;

export type LandmarkCardProps = {
  landmark: Landmark;
  onPress?: () => void;
};
export const LandmarkCard = ({ landmark, onPress }: LandmarkCardProps) => {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      accessibilityLabel="Landmark Card"
    >
      <SharedElement
        id={`landmark.${landmark.id}.heart`}
        style={styles.heartButton}
      >
        <LandmarkHeartButton landmark={landmark} size={32} />
      </SharedElement>
      <SharedElement id={`landmark.${landmark.id}.photo`}>
        <Image style={styles.landmarkImage} source={{ uri: landmark.image }} />
      </SharedElement>
      <SharedElement
        id={`landmark.${landmark.id}.name`}
        style={styles.landmarkCardInner}
      >
        <Text type="h2" style={styles.landmarkName}>
          {landmark.name}
        </Text>
      </SharedElement>
      <SharedElement
        id={`landmark.${landmark.id}.actionButton`}
        style={styles.backButton}
      >
        {/* The following element is hidden and scaled down, so that the shared element transitions nicely rather than popping in */}
        {/* There is probably a nicer way of doing this using react-native-shared-transisition */}
        <BackButton />
      </SharedElement>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    width: LANDMARK_CARD_WIDTH - LANDMARK_CARD_MARGIN,
    height: LANDMARK_CARD_HEIGHT,
    marginLeft: LANDMARK_CARD_MARGIN,
  },
  landmarkCardEnd: {
    borderRadius: 16,
    overflow: 'hidden',
    width:
      width - LANDMARK_CARD_WIDTH - LANDMARK_CARD_MARGIN - LANDMARK_CARD_MARGIN,
    height: LANDMARK_CARD_HEIGHT,
    marginHorizontal: LANDMARK_CARD_MARGIN,
  },
  landmarkCardInner: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 8,
  },
  landmarkImage: {
    borderRadius: 16,
    width: LANDMARK_CARD_WIDTH - LANDMARK_CARD_MARGIN,
    height: LANDMARK_CARD_HEIGHT,
  },
  landmarkName: {
    color: colors.textInverted,
    textAlignVertical: 'bottom',
  },
  heartButton: {
    position: 'absolute',
    zIndex: 100,
    top: 8,
    right: 8,
  },
  backButton: {
    position: 'absolute',
    right: -100,
    bottom: -100,
    transform: [{ scaleX: 0 }, { scaleY: 0 }],
  },
});
