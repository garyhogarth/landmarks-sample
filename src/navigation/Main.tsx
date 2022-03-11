import { CardStyleInterpolators } from '@react-navigation/stack';
import React from 'react';

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { LandmarkScreen, Landmark } from '../screens/LandmarkScreen';
import { MapScreen } from '../screens/MapScreen';

export type MainStackParams = {
  Map: undefined;
  Landmark: { landmark?: Landmark } | undefined;
};

const MainStack = createSharedElementStackNavigator<MainStackParams>();

export const Main = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
    }}
  >
    <MainStack.Screen name="Map" component={MapScreen} />
    <MainStack.Screen
      name="Landmark"
      component={LandmarkScreen}
      sharedElements={route => {
        const { landmark } = route.params;
        return [
          `landmark.${landmark.id}.photo`,
          `landmark.${landmark.id}.name`,
        ];
      }}
    />
  </MainStack.Navigator>
);
