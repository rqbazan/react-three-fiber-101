import getRandomMoves from '../get-random-moves'

it('creates random moves', () => {
  const quantity = 20
  const moves = getRandomMoves(quantity)

  expect(moves).toHaveLength(quantity)

  for (let i = 0; i < moves.length - 1; i++) {
    expect(moves[i]).not.toEqual(moves[i + 1])
  }
})
