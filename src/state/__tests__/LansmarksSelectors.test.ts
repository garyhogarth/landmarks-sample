import { getFavouriteLandmarkIds } from '../LandmarksSelectors';

it('should handle a favourite being added to an empty array', () => {
  expect(
    getFavouriteLandmarkIds({
      landmarks: { favouriteLandmarkIds: ['123', '12345'] },
    }),
  ).toEqual(['123', '12345']);
});
