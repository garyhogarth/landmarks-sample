// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

// import { MainStackParams } from '../navigation/Main';

// type MapNavigation = StackNavigationProp<MainStackParams, 'Map'>;

export const Map = () => {
  // const { navigate } = useNavigation<MapNavigation>();
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});
