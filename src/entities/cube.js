import getNewPositions from 'utils/get-new-positions'
import Piece from './piece'

// prettier-ignore
const pieceNames = [
  'ULF', 'UF', 'URF',
  'FL', 'F', 'FR',
  'DLF', 'DF', 'DRF',

  'UL', 'U', 'UR',
  'L', 'C', 'R',
  'DL', 'D', 'DR',

  'ULB', 'UB', 'URB',
  'BL', 'B', 'BR',
  'DLB', 'DB', 'DRB'
]

const toObjectReduceParams = [(obj, current) => Object.assign(obj, current), {}]

class Cube {
  constructor(cubeState = {}) {
    const createPiece = (name, defaultKey) => {
      if (!cubeState.pieceKeyByName) {
        return new Piece(defaultKey)
      }

      return new Piece(cubeState.pieceKeyByName[name])
    }

    this.pieces = pieceNames
      .map((name, key) => ({ [name]: createPiece(name, key) }))
      .reduce(...toObjectReduceParams)

    // prettier-ignore
    this.faces = {
      F: [
        this.pieces.ULF, this.pieces.UF, this.pieces.URF,
        this.pieces.FL, this.pieces.F, this.pieces.FR,
        this.pieces.DLF, this.pieces.DF, this.pieces.DRF
      ],
      B: [
        this.pieces.URB, this.pieces.UB, this.pieces.ULB,
        this.pieces.BR, this.pieces.B, this.pieces.BL,
        this.pieces.DRB, this.pieces.DB, this.pieces.DLB
      ],
      R: [
        this.pieces.URF, this.pieces.UR, this.pieces.URB,
        this.pieces.FR, this.pieces.R, this.pieces.BR,
        this.pieces.DRF, this.pieces.DR, this.pieces.DRB
      ],
      L: [
        this.pieces.ULB, this.pieces.UL, this.pieces.ULF,
        this.pieces.BL, this.pieces.L, this.pieces.FL,
        this.pieces.DLB, this.pieces.DL, this.pieces.DLF
      ],
      U: [
        this.pieces.ULB, this.pieces.UB, this.pieces.URB,
        this.pieces.UL, this.pieces.U, this.pieces.UR,
        this.pieces.ULF, this.pieces.UF, this.pieces.URF
      ],
      D: [
        this.pieces.DLF, this.pieces.DF, this.pieces.DRF,
        this.pieces.DL, this.pieces.D, this.pieces.DR,
        this.pieces.DLB, this.pieces.DB, this.pieces.DRB,
      ],
      M: [
        this.pieces.UB, this.pieces.U, this.pieces.UF,
        this.pieces.B, this.pieces.C, this.pieces.F,
        this.pieces.DB, this.pieces.D, this.pieces.DF
      ],
      E: [
        this.pieces.FL, this.pieces.F, this.pieces.FR,
        this.pieces.L, this.pieces.C, this.pieces.R,
        this.pieces.BL, this.pieces.B, this.pieces.BR,
      ],
      S: [
        this.pieces.UL, this.pieces.U, this.pieces.UR,
        this.pieces.L, this.pieces.C, this.pieces.R,
        this.pieces.DL, this.pieces.D, this.pieces.DR
      ]
    }
  }

  rotate(faceName, degrees = 90) {
    const facePieces = this.faces[faceName]

    const newPositions =
      degrees === 90
        ? Cube.clockwiseNewPositions
        : Cube.counterClockwiseNewPositions

    function moveKeysBetweenPieces(initialPosition) {
      function recursiveMove(position) {
        const newPosition = newPositions[position]
        if (newPosition === newPositions[initialPosition]) {
          return
        }
        recursiveMove(newPosition)
        facePieces[newPosition].key = facePieces[position].key
      }

      const initialKeyTemp = facePieces[initialPosition].key
      const newPosition = newPositions[initialPosition]
      recursiveMove(newPosition)
      facePieces[newPosition].key = initialKeyTemp
    }

    // move vertices starting with the first one at facePieces[0]
    moveKeysBetweenPieces(0)
    // move edges starting with the first one at facePieces[1]
    moveKeysBetweenPieces(1)
  }

  getState() {
    const pieceKeyByName = pieceNames
      .map(pieceName => ({ [pieceName]: this.pieces[pieceName] }))
      .reduce(...toObjectReduceParams)

    return { pieceKeyByName }
  }
}

/**
 * these fields should be static fields, but there is a issue with esm
 * and avajs depends on it.
 *
 * https://github.com/standard-things/esm/issues/858
 */
Cube.size = 3

Cube.angles = {
  CLOCKWISE: 90,
  COUNTERCLOCKWISE: -90
}

Cube.axis = {
  X: [1, 0, 0],
  Y: [0, 1, 0],
  Z: [0, 0, 1]
}

Cube.clockwiseNewPositions = getNewPositions(Cube.size, Cube.angles.CLOCKWISE)

Cube.counterClockwiseNewPositions = getNewPositions(
  Cube.size,
  Cube.angles.COUNTERCLOCKWISE
)

export default Cube
