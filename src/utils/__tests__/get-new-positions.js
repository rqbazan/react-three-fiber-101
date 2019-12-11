import test from 'ava'
import getNewPositions from '../get-new-positions'

test('calculate new positions 90º', t => {
  const positions = getNewPositions(3, 90)
  t.deepEqual(positions, [2, 5, 8, 1, 4, 7, 0, 3, 6])
})

test('calculate new positions -90º', t => {
  const positions = getNewPositions(3, -90)
  t.deepEqual(positions, [6, 3, 0, 7, 4, 1, 8, 5, 2])
})
