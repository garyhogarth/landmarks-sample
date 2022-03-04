import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ImageBackground, Pressable, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Entypo } from '@expo/vector-icons';
// Importing directly from the JSON for now
import landmarks from '../../assets/londonLandmarks.json';

import { MainStackParams } from '../navigation/Main';
import { FlatList } from 'react-native-gesture-handler';
import colors from '../constants/colors';
import { Text } from 'react-native';

type MapNavigationProp = StackNavigationProp<MainStackParams, 'Map'>;

// Hardcode the initial location as the center of London
// TODO - either convert to current location or derive from markers
const INITIAL_LOCATION: Region = {
  latitude: 51.50112240771424,
  longitude: -0.10935723958435054,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

export const Map = () => {
  const { navigate } = useNavigation<MapNavigationProp>();
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={INITIAL_LOCATION}
        provider={PROVIDER_GOOGLE}
        testID="map"
      >
        {landmarks.map(({ id, latlng }) => (
          <Marker key={`landmark-${id}`} coordinate={latlng} onPress={() => {}}>
            <Entypo name="location-pin" size={90} color={'#5E616D'} />
          </Marker>
        ))}
      </MapView>
      <View style={styles.panel}>
        <FlatList
          data={landmarks}
          horizontal
          decelerationRate="fast"
          snapToInterval={300}
          renderItem={({ item }) => (
            <Pressable
              style={styles.landmarkCard}
              onPress={() => navigate('Landmark', { landmark: item })}
            >
              <ImageBackground
                style={styles.landmarkImage}
                source={{ uri: item.image }}
              >
                <Text style={styles.landmarkName}>{item.name}</Text>
              </ImageBackground>
            </Pressable>
          )}
          ListFooterComponent={() => (
            <View style={styles.landmarkCard}>
              <Text>No More</Text>
            </View>
          )}
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
    backgroundColor: colors.white,
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
    width: 268,
    height: 150,
    marginLeft: 32,
  },
  landmarkImage: {
    borderRadius: 16,
    width: 300,
    height: 150,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  landmarkName: {
    fontSize: 32,
    fontWeight: 'bold',
    width: 200,
    margin: 8,
    color: colors.white,
    textAlignVertical: 'bottom',
  },
});
