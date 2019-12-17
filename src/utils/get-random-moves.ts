import { Move, FaceName } from 'types'
import shuffle from 'lodash.shuffle'

const faceNames: FaceName[] = ['U', 'D', 'F', 'B', 'L', 'R']

function times<T>(arr: T[], n: number) {
  let result: T[] = []

  for (let i = 0; i < n; i += 1) {
    result = result.concat(arr)
  }

  return result
}

export default function getRandomMoves(quantity: number): Move[] {
  const groups = Math.ceil(quantity / faceNames.length)
  const leftOver = groups * faceNames.length - quantity
  const dataSource = times(faceNames, groups).slice(0, -leftOver)

  return shuffle(dataSource).map(faceName => ({
    faceName,
    inversed: Math.random() >= 0.5
  }))
}
