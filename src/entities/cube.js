import Piece from './piece'

function getNewPositions(rowLength, degrees) {
  const newPositions = []

  for (let index = 0; index < rowLength * rowLength; index += 1) {
    const x = index % rowLength
    const y = Math.trunc(index / rowLength)

    const newX = degrees === 90 ? rowLength - y - 1 : y
    const newY = degrees === 90 ? x : rowLength - x - 1

    newPositions[index] = newY * rowLength + newX
  }

  return newPositions
}

const clockwiseNewPositions = getNewPositions(3, 90)
const anticlockwiseNewPositions = getNewPositions(3, -90)

export default class Cube {
  static angles = {
    CLOCKWISE: 90,
    ANTICLOCKWISE: -90
  }

  static axisVectors = {
    X: [1, 0, 0],
    Y: [0, 1, 0],
    Z: [0, 0, 1]
  }

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
      RIGHT: [
        this.pieces.URF, this.pieces.UR, this.pieces.URB,
        this.pieces.FR, this.pieces.R, this.pieces.BR,
        this.pieces.DRF, this.pieces.DR, this.pieces.DRB
      ],
      FRONT: [
        this.pieces.ULF, this.pieces.UF, this.pieces.URF,
        this.pieces.FL, this.pieces.F, this.pieces.FR,
        this.pieces.DLF, this.pieces.DF, this.pieces.DRF
      ]
    }
  }

  rotate(faceName, degrees = 90) {
    const facePieces = this.faces[faceName]

    const newPositions =
      degrees === 90 ? clockwiseNewPositions : anticlockwiseNewPositions

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

    // move corners starting with the first one at face[0]
    moveKeysBetweenPieces(0)
    // move edges starting with the first one at face[1]
    moveKeysBetweenPieces(1)
  }
}
