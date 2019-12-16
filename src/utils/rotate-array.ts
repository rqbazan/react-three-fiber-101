export default function rotateArray<T>(array: T[], backward = false): T[] {
  if (backward) {
    return [...array.slice(1), array[0]]
  }

  return [array[array.length - 1], ...array.slice(0, -1)]
}
