import React from 'react';

import { Map } from '../screens/Map';
import { Landmark, LandmarkRecord } from '../screens/Landmark';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

export type MainStackParams = {
  Map: undefined;
  Landmark: { landmark?: LandmarkRecord } | undefined;
};

const MainStack = createSharedElementStackNavigator<MainStackParams>();

export const Main = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <MainStack.Screen name="Map" component={Map} />
    <MainStack.Screen
      name="Landmark"
      component={Landmark}
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
