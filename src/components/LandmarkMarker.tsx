import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { Marker } from 'react-native-maps';

import colors from '../constants/colors';
import { Landmark } from '../screens/LandmarkScreen';

type LandmarkMarkerProps = {
  landmark: Landmark;
  onPress: () => void;
  active: boolean;
};

export const LandmarkMarker = ({
  landmark,
  onPress,
  active = false,
}: LandmarkMarkerProps) => {
  return (
    <Marker
      key={`landmark-${landmark.id}`}
      coordinate={landmark.latlng}
      onPress={onPress}
    >
      <Entypo
        name="location-pin"
        size={90}
        color={active ? colors.activeHighlight : colors.inactiveHighlight}
      />
    </Marker>
  );
};
