import { FaceName } from 'types'
import Cube from './cube'

// eslint-disable-next-line
const noop = () => {}

export default class Move {
  faceName: FaceName

  targetAngle: number

  currentAngle: number

  stepAngle: number

  complete = noop

  progress: (self: Move) => void = noop

  isCompleted = false

  constructor(faceName: FaceName, inversed: boolean, stepAngle: number) {
    this.faceName = faceName
    this.stepAngle = stepAngle
    this.currentAngle = 0
    this.targetAngle = inversed
      ? Cube.angles.COUNTERCLOCKWISE
      : Cube.angles.CLOCKWISE
  }

  onComplete(callback: () => void) {
    this.complete = callback
  }

  onProgress(callback: (self: Move) => void) {
    this.progress = callback
  }

  run() {
    const targetSign = Math.sign(this.targetAngle)
    this.currentAngle += this.stepAngle * targetSign

    if (Math.abs(this.currentAngle) > Math.abs(this.targetAngle)) {
      this.currentAngle = this.targetAngle
    }

    this.progress(this)

    if (this.currentAngle === this.targetAngle) {
      this.complete()
      this.isCompleted = true
    }
  }
}
