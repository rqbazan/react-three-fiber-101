export default function getNewPositions(rowLength: number, degrees: number) {
  const newPositions: number[] = []

  for (let index = 0; index < rowLength * rowLength; index += 1) {
    const x = index % rowLength
    const y = Math.trunc(index / rowLength)

    const newX = degrees === 90 ? rowLength - y - 1 : y
    const newY = degrees === 90 ? x : rowLength - x - 1

    newPositions[index] = newY * rowLength + newX
  }

  return newPositions
}
