import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useRef, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SharedElement } from 'react-navigation-shared-element';

// Importing directly from the JSON for now
import landmarks from '../../assets/londonLandmarks.json';
import { Text } from '../components/Text';

import colors from '../constants/colors';
import { MainStackParams } from '../navigation/Main';
import { Landmark } from './LandmarkScreen';

type MapScreenNavigationProp = StackNavigationProp<MainStackParams, 'Map'>;

const { width } = Dimensions.get('screen');

const LANDMARK_CARD_WIDTH = width * 0.75;
const LANDMARK_CARD_HEIGHT = 150;
const LANDMARK_CARD_MARGIN = 32;
const REGION_DELTA = 0.05;

export const MapScreen = () => {
  const { navigate } = useNavigation<MapScreenNavigationProp>();
  const [focusedMarkerId, setFocusedMarkerId] = useState(landmarks[0].id);
  const mapRef = useRef<MapView>(null);
  const listRef = useRef<FlatList<any>>(null);

  const landmarkMarkerSelected = useCallback((landmark: Landmark): void => {
    const index = landmarks.findIndex(({ id }) => id === landmark.id);
    setFocusedMarkerId(landmark.id);
    listRef.current?.scrollToIndex({ index });
    mapRef.current?.animateToRegion({
      latitude: landmark.latlng.latitude,
      longitude: landmark.latlng.longitude,
      latitudeDelta: REGION_DELTA,
      longitudeDelta: REGION_DELTA,
    });
  }, []);

  const showLandmarkDetails = useCallback(
    (landmark: Landmark): void => {
      navigate('Landmark', { landmark });
    },
    [navigate],
  );

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        testID="map"
        onMapReady={() => landmarkMarkerSelected(landmarks[0])}
      >
        {landmarks.map(landmark => (
          <Marker
            key={`landmark-${landmark.id}`}
            coordinate={landmark.latlng}
            onPress={() =>
              focusedMarkerId === landmark.id
                ? showLandmarkDetails(landmark)
                : landmarkMarkerSelected(landmark)
            }
          >
            <Entypo
              name="location-pin"
              size={90}
              color={
                focusedMarkerId === landmark.id
                  ? colors.activeHighlight
                  : colors.inactiveHighlight
              }
            />
          </Marker>
        ))}
      </MapView>
      <View style={styles.panel}>
        <FlatList
          ref={listRef}
          data={landmarks}
          horizontal
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          snapToInterval={LANDMARK_CARD_WIDTH}
          onScroll={({ nativeEvent }) => {
            if (nativeEvent.contentOffset?.x % LANDMARK_CARD_WIDTH === 0) {
              landmarkMarkerSelected(
                landmarks[nativeEvent.contentOffset?.x / LANDMARK_CARD_WIDTH],
              );
            }
          }}
          getItemLayout={(data, index) => ({
            length: LANDMARK_CARD_WIDTH,
            offset: LANDMARK_CARD_WIDTH * index,
            index,
          })}
          renderItem={({ item: landmark }) => (
            <Pressable
              style={styles.landmarkCard}
              onPress={() =>
                focusedMarkerId === landmark.id
                  ? showLandmarkDetails(landmark)
                  : landmarkMarkerSelected(landmark)
              }
            >
              <SharedElement id={`landmark.${landmark.id}.photo`}>
                <Image
                  style={styles.landmarkImage}
                  source={{ uri: landmark.image }}
                />
              </SharedElement>
              <View style={styles.landmarkCardInner}>
                <Text type="h2" style={styles.landmarkName}>
                  {landmark.name}
                </Text>
              </View>
            </Pressable>
          )}
          ListFooterComponent={() => <View style={styles.landmarkCardEnd} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  panel: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    position: 'absolute',
    paddingVertical: 32,
    bottom: 0,
    left: 0,
    right: 0,
  },
  landmarkCard: {
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
    width: LANDMARK_CARD_WIDTH - LANDMARK_CARD_MARGIN,
    height: LANDMARK_CARD_HEIGHT,
  },
  landmarkName: {
    color: colors.textInverted,
    textAlignVertical: 'bottom',
  },
});
