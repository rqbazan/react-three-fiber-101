import test from 'ava'
import getRandomMoves from '../get-random-moves'

test('random moves', t => {
  const quantity = 20
  const moves = getRandomMoves(quantity)

  t.is(moves.length, quantity)

  for (let i = 0; i < moves.length - 1; i++) {
    t.notDeepEqual(moves[i], moves[i + 1])
  }
})
