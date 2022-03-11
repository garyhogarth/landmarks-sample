import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { rootReducer } from '../state/store';

export type RootState = ReturnType<typeof rootReducer>;
export function renderWithStore(
  component: React.ReactNode,
  preloadedState?: RootState,
) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });
  return render(<Provider store={store}>{component}</Provider>);
}
