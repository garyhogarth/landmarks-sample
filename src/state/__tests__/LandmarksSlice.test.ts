import reducer, {
  addFavouriteLandmark,
  removeFavouriteLandmark,
} from '../LandmarksSlice';

it('should handle a favourite being added to an empty array', () => {
  expect(
    reducer({ favouriteLandmarkIds: [] }, addFavouriteLandmark('123')),
  ).toEqual({
    favouriteLandmarkIds: ['123'],
  });
});

it('should handle a favourite being added', () => {
  expect(
    reducer({ favouriteLandmarkIds: ['123'] }, addFavouriteLandmark('12345')),
  ).toEqual({
    favouriteLandmarkIds: ['123', '12345'],
  });
});

it('should handle a favourite being added that already exists', () => {
  expect(
    reducer(
      { favouriteLandmarkIds: ['123', '12345'] },
      addFavouriteLandmark('12345'),
    ),
  ).toEqual({
    favouriteLandmarkIds: ['123', '12345'],
  });
});

it('should handle a removing a favourite', () => {
  expect(
    reducer(
      { favouriteLandmarkIds: ['123', '12345'] },
      removeFavouriteLandmark('12345'),
    ),
  ).toEqual({
    favouriteLandmarkIds: ['123'],
  });
});

it('should handle a removing a favourite that doesnt exist', () => {
  expect(
    reducer(
      { favouriteLandmarkIds: ['123', '12345'] },
      removeFavouriteLandmark('123456'),
    ),
  ).toEqual({
    favouriteLandmarkIds: ['123', '12345'],
  });
});
