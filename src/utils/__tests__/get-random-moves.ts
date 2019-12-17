import test from 'ava'
import getRandomMoves from '../get-random-moves'

// TODO: add mocking

test('random moves', t => {
  const quantity = 20
  const moves = getRandomMoves(quantity)

  t.is(moves.length, quantity)
})
