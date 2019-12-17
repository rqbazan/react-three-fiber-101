import { Move, FaceName } from 'types'
import shuffle from 'lodash.shuffle'

export default function getRandomMoves(quantity: number): Move[] {
  const faceNames: FaceName[] = shuffle(['U', 'D', 'F', 'B', 'L', 'R'])
  const moves: Move[] = []

  for (let i = 0; i < quantity; i++) {
    const x = i % faceNames.length

    moves[i] = {
      faceName: faceNames[x],
      inversed: Math.random() > 0.5
    }
  }

  return moves
}
