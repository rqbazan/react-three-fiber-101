import getNewPositions from 'utils/get-new-positions'
import Piece from './piece'

class Cube {
  constructor() {
    // prettier-ignore
    this.pieces = {
      ULF: new Piece(0), UF: new Piece(1), URF: new Piece(2),
      FL:  new Piece(3), F:  new Piece(4), FR:  new Piece(5),
      DLF: new Piece(6), DF: new Piece(7), DRF: new Piece(8),

      UL: new Piece(9),  U: new Piece(10), UR: new Piece(11),
      L:  new Piece(12),   /* (0,0,0) */   R:  new Piece(13),
      DL: new Piece(14), D: new Piece(15), DR: new Piece(16),

      ULB: new Piece(17), UB: new Piece(18), URB: new Piece(19),
      BL:  new Piece(20), B:  new Piece(21), BR:  new Piece(22),
      DLB: new Piece(23), DB: new Piece(24), DRB: new Piece(25)
    }

    // prettier-ignore
    this.faces = {
      FRONT: [
        this.pieces.ULF, this.pieces.UF, this.pieces.URF,
        this.pieces.FL, this.pieces.F, this.pieces.FR,
        this.pieces.DLF, this.pieces.DF, this.pieces.DRF
      ],
      BACK: [
        this.pieces.URB, this.pieces.UB, this.pieces.ULB,
        this.pieces.BR, this.pieces.B, this.pieces.BL,
        this.pieces.DRB, this.pieces.DB, this.pieces.DLB
      ],
      RIGHT: [
        this.pieces.URF, this.pieces.UR, this.pieces.URB,
        this.pieces.FR, this.pieces.R, this.pieces.BR,
        this.pieces.DRF, this.pieces.DR, this.pieces.DRB
      ],
      LEFT: [
        this.pieces.ULB, this.pieces.UL, this.pieces.ULF,
        this.pieces.BL, this.pieces.L, this.pieces.FL,
        this.pieces.DLB, this.pieces.DL, this.pieces.DLF
      ],
      UP: [
        this.pieces.ULB, this.pieces.UB, this.pieces.URB,
        this.pieces.UL, this.pieces.U, this.pieces.UR,
        this.pieces.ULF, this.pieces.UF, this.pieces.URF
      ],
      DOWN: [
        this.pieces.DLF, this.pieces.DF, this.pieces.DRF,
        this.pieces.DL, this.pieces.D, this.pieces.DR,
        this.pieces.DLB, this.pieces.DB, this.pieces.DRB,
      ]
    }
  }

  rotate(faceName, degrees = 90) {
    const facePieces = this.faces[faceName]

    const newPositions =
      degrees === 90
        ? Cube.clockwiseNewPositions
        : Cube.anticlockwiseNewPositions

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
  ANTICLOCKWISE: -90
}

Cube.axisVectors = {
  X: [1, 0, 0],
  Y: [0, 1, 0],
  Z: [0, 0, 1]
}

Cube.clockwiseNewPositions = getNewPositions(Cube.size, Cube.angles.CLOCKWISE)

Cube.anticlockwiseNewPositions = getNewPositions(
  Cube.size,
  Cube.angles.ANTICLOCKWISE
)

export default Cube
