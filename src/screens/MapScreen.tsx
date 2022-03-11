import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

// Importing directly from the JSON for now
import landmarks from '../../assets/londonLandmarks.json';
import {
  LandmarkCard,
  LANDMARK_CARD_HEIGHT,
  LANDMARK_CARD_MARGIN,
  LANDMARK_CARD_WIDTH,
} from '../components/LandmarkCard';
import { LandmarkMarker } from '../components/LandmarkMarker';

import colors from '../constants/colors';
import { MainStackParams } from '../navigation/Main';
import { Landmark } from './LandmarkScreen';

type MapScreenNavigationProp = StackNavigationProp<MainStackParams, 'Map'>;

const { width } = Dimensions.get('screen');

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
        testID="Map"
        onMapReady={() => landmarkMarkerSelected(landmarks[0])}
      >
        {landmarks.map(landmark => (
          <LandmarkMarker
            key={`landmark-${landmark.id}`}
            landmark={landmark}
            active={focusedMarkerId === landmark.id}
            onPress={() =>
              focusedMarkerId === landmark.id
                ? showLandmarkDetails(landmark)
                : landmarkMarkerSelected(landmark)
            }
          />
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
            <LandmarkCard
              landmark={landmark}
              onPress={() =>
                focusedMarkerId === landmark.id
                  ? showLandmarkDetails(landmark)
                  : landmarkMarkerSelected(landmark)
              }
            />
          )}
          ListFooterComponent={() => <View style={styles.blankFillerCar} />}
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
  blankFillerCar: {
    borderRadius: 16,
    overflow: 'hidden',
    width: width - LANDMARK_CARD_WIDTH - 2 * LANDMARK_CARD_MARGIN,
    height: LANDMARK_CARD_HEIGHT,
    marginHorizontal: LANDMARK_CARD_MARGIN,
  },
});
