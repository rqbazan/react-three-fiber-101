import Cube from '~/entities/cube'

export const facesMeta = {
  U: {
    axis: Cube.axis.Y,
    inverse: true
  },
  D: {
    axis: Cube.axis.Y,
    inverse: false
  },
  R: {
    axis: Cube.axis.X,
    inverse: true
  },
  L: {
    axis: Cube.axis.X,
    inverse: false
  },
  F: {
    axis: Cube.axis.Z,
    inverse: true
  },
  B: {
    axis: Cube.axis.Z,
    inverse: false
  },
  M: {
    axis: Cube.axis.X,
    inverse: false
  },
  E: {
    axis: Cube.axis.Y,
    inverse: false
  },
  S: {
    axis: Cube.axis.Z,
    inverse: true
  }
}
