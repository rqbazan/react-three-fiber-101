import * as THREE from 'three'
import getNewPositions from '~/utils/get-new-positions'
import { SliceName } from '~/types'
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

interface CubeState {
  pieceKeys: number[]
}

class Cube {
  static size = 3

  static angles = {
    CLOCKWISE: 90,
    COUNTERCLOCKWISE: -90
  }

  static axis = {
    X: new THREE.Vector3(1, 0, 0),
    Y: new THREE.Vector3(0, 1, 0),
    Z: new THREE.Vector3(0, 0, 1)
  }

  static clockwiseNewPositions = getNewPositions(
    Cube.size,
    Cube.angles.CLOCKWISE
  )

  static counterClockwiseNewPositions = getNewPositions(
    Cube.size,
    Cube.angles.COUNTERCLOCKWISE
  )

  static sliceNames: SliceName[] = ['M', 'S', 'E']

  pieces: {
    [key: string]: Piece
  }

  faces: {
    [key: string]: Piece[]
  }

  constructor(cubeState?: CubeState) {
    const createPiece = (index: number) => {
      const key = cubeState?.pieceKeys?.[index] ?? index
      return new Piece(key)
    }

    this.pieces = pieceNames
      .map((name, index) => ({ [name]: createPiece(index) }))
      .reduce((obj: any, current: any) => Object.assign(obj, current), {})

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

  rotate(faceName: string, inversed = false) {
    const facePieces = this.faces[faceName]

    const newPositions = inversed
      ? Cube.counterClockwiseNewPositions
      : Cube.clockwiseNewPositions

    function moveKeysBetweenPieces(initialPosition: number) {
      function recursiveMove(position: number) {
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
    const pieceKeys = pieceNames.map(pieceName => this.pieces[pieceName].key)

    return { pieceKeys }
  }
}

export default Cube
