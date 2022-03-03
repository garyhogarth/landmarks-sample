import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Map } from '../screens/Map';
import { Landmark } from '../screens/Landmark';

export type MainStackParams = {
  Map: undefined;
  Landmark: undefined;
};

const MainStack = createStackNavigator<MainStackParams>();

export const Main = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Map" component={Map} />
    <MainStack.Screen name="Landmark" component={Landmark} />
  </MainStack.Navigator>
);
