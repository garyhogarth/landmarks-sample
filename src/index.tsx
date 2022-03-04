import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import { Main } from './navigation/Main';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en: require('./translations/en-GB.json'),
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
i18n.defaultLocale = 'en';
i18n.fallbacks = true;

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </>
  );
}
