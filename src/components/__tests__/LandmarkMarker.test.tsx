import { render } from '@testing-library/react-native';
import React from 'react';

import { LandmarkMarker } from '../LandmarkMarker';

const MOCK_LANDMARK = {
  id: '94459b01-7756-4a37-9458-8acab402ecb0',
  name: 'Big Ben',
  latlng: {
    latitude: 51.500782626551675,
    longitude: -0.12552662330828043,
  },
  description:
    'Big Ben is the nickname for the Great Bell of the striking clock at the north end of the Palace of Westminster; the name is frequently extended to also refer to the clock and the clock tower. The official name of the tower in which Big Ben is located was originally the Clock Tower; it was renamed Elizabeth Tower in 2012 to mark the Diamond Jubilee of Elizabeth II, Queen of the United Kingdom.',
  image:
    'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};

it('works as a card', () => {
  const onPress = jest.fn();
  render(
    <LandmarkMarker
      landmark={MOCK_LANDMARK}
      active={false}
      onPress={onPress}
    />,
  );
});
