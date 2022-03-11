import { NavigationContainer } from '@react-navigation/native';

import * as Localization from 'expo-localization';
import { StatusBar } from 'expo-status-bar';
import i18n from 'i18n-js';
import React from 'react';
import { Provider } from 'react-redux';
import { Main } from './navigation/Main';
import store from './state/store';
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
      <Provider store={store}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </Provider>
    </>
  );
}
