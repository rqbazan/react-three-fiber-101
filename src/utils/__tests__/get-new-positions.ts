import getNewPositions from '../get-new-positions'

it('calculates new positions 90º', () => {
  expect(getNewPositions(3, 90)).toEqual([2, 5, 8, 1, 4, 7, 0, 3, 6])
})

it('calculates new positions -90º', () => {
  expect(getNewPositions(3, -90)).toEqual([6, 3, 0, 7, 4, 1, 8, 5, 2])
})
