import React from 'react'
import * as THREE from 'three'
import { FaceName } from 'types'
import { useRender } from 'react-three-fiber'
import getRandomMoves from 'utils/get-random-moves'
import useRefs from 'hooks/use-refs'
import CubeEntity from 'entities/cube'
import { rotateAroundWorldAxis } from './helpers'
import { facesMeta } from './meta'
import Box from '../box'

interface Move {
  targetAngle: number
  faceName: FaceName
  currentAngle: number
  velocity: number
  complete(): void
}

export interface CubeRef {
  rotateFace(faceName: FaceName, inversed: boolean): void
  scrambleFaces(): void
}

const defaultVelocity = 6

const cube = new CubeEntity()

const Cube = React.forwardRef<CubeRef, {}>((_, ref) => {
  const boxRefs = useRefs<THREE.Mesh>(27)
  const moveRef = React.useRef<Move>()

  const rotateMeshs = (faceName: FaceName, angle: number) => {
    const facePieces = cube.faces[faceName]

    // workaround for not available refs, for now
    for (let i = 0; i < 9; i += 1) {
      const piece = facePieces[i]
      if (!boxRefs[piece.key].current) {
        return
      }
    }

    for (let i = 0; i < 9; i += 1) {
      const piece = facePieces[i]
      rotateAroundWorldAxis(
        boxRefs[piece.key].current!,
        facesMeta[faceName].axis,
        THREE.Math.degToRad(angle)
      )
    }
  }

  const rotateFace = async (
    faceName: FaceName,
    inversed: boolean,
    velocity?: number
  ) => {
    if (moveRef.current) {
      return Promise.resolve()
    }

    const targetAngle = inversed
      ? CubeEntity.angles.COUNTERCLOCKWISE
      : CubeEntity.angles.CLOCKWISE

    return new Promise(resolve => {
      moveRef.current = {
        targetAngle,
        faceName,
        velocity: velocity ?? defaultVelocity,
        complete: resolve,
        currentAngle: 0
      }
    })
  }

  const scrambleFaces = async () => {
    const moves = getRandomMoves(20)
    for (let i = 0; i < moves.length; i++) {
      const { faceName, inversed } = moves[i]
      // eslint-disable-next-line
      await rotateFace(faceName, inversed, defaultVelocity * 3)
    }
  }

  useRender(() => {
    if (!moveRef.current) {
      return
    }

    const move = moveRef.current
    const { faceName, targetAngle, velocity } = move
    const faceMeta = facesMeta[faceName]

    if (move.currentAngle === move.targetAngle) {
      cube.rotate(faceName, targetAngle)
      moveRef.current.complete()
      moveRef.current = undefined
      return
    }

    const targetSign = Math.sign(targetAngle)
    const rotationFactor = faceMeta.inverse ? -targetSign : targetSign

    rotateMeshs(faceName, velocity * rotationFactor)

    moveRef.current.currentAngle += velocity * targetSign

    if (Math.abs(moveRef.current.currentAngle) > 90) {
      moveRef.current.currentAngle = 90 * targetSign
    }
  }, false)

  React.useImperativeHandle(ref, () => ({
    rotateFace,
    scrambleFaces
  }))

  return (
    <React.Suspense fallback={null}>
      <Box
        ref={boxRefs[0]}
        position={[-1, 1, 1]}
        upColor="yellow"
        leftColor="red"
        frontColor="green"
      />
      <Box
        ref={boxRefs[1]}
        position={[0, 1, 1]}
        upColor="yellow"
        frontColor="green"
      />
      <Box
        ref={boxRefs[2]}
        position={[1, 1, 1]}
        upColor="yellow"
        rightColor="orange"
        frontColor="green"
      />
      <Box
        ref={boxRefs[3]}
        position={[-1, 0, 1]}
        frontColor="green"
        leftColor="red"
      />
      <Box ref={boxRefs[4]} position={[0, 0, 1]} frontColor="green" />
      <Box
        ref={boxRefs[5]}
        position={[1, 0, 1]}
        frontColor="green"
        rightColor="orange"
      />
      <Box
        ref={boxRefs[6]}
        position={[-1, -1, 1]}
        leftColor="red"
        frontColor="green"
        downColor="white"
      />
      <Box
        ref={boxRefs[7]}
        position={[0, -1, 1]}
        frontColor="green"
        downColor="white"
      />
      <Box
        ref={boxRefs[8]}
        position={[1, -1, 1]}
        rightColor="orange"
        frontColor="green"
        downColor="white"
      />
      <Box
        ref={boxRefs[9]}
        position={[-1, 1, 0]}
        upColor="yellow"
        leftColor="red"
      />
      <Box ref={boxRefs[10]} position={[0, 1, 0]} upColor="yellow" />
      <Box
        ref={boxRefs[11]}
        position={[1, 1, 0]}
        upColor="yellow"
        rightColor="orange"
      />
      <Box ref={boxRefs[12]} position={[-1, 0, 0]} leftColor="red" />
      <Box ref={boxRefs[13]} position={[0, 0, 0]} />
      <Box ref={boxRefs[14]} position={[1, 0, 0]} rightColor="orange" />
      <Box
        ref={boxRefs[15]}
        position={[-1, -1, 0]}
        leftColor="red"
        downColor="white"
      />
      <Box ref={boxRefs[16]} position={[0, -1, 0]} downColor="white" />
      <Box
        ref={boxRefs[17]}
        position={[1, -1, 0]}
        rightColor="orange"
        downColor="white"
      />
      <Box
        ref={boxRefs[18]}
        position={[-1, 1, -1]}
        backColor="blue"
        upColor="yellow"
        leftColor="red"
      />
      <Box
        ref={boxRefs[19]}
        position={[0, 1, -1]}
        backColor="blue"
        upColor="yellow"
      />
      <Box
        ref={boxRefs[20]}
        position={[1, 1, -1]}
        backColor="blue"
        upColor="yellow"
        rightColor="orange"
      />
      <Box
        ref={boxRefs[21]}
        position={[-1, 0, -1]}
        backColor="blue"
        leftColor="red"
      />
      <Box ref={boxRefs[22]} position={[0, 0, -1]} backColor="blue" />
      <Box
        ref={boxRefs[23]}
        position={[1, 0, -1]}
        backColor="blue"
        rightColor="orange"
      />
      <Box
        ref={boxRefs[24]}
        position={[-1, -1, -1]}
        leftColor="red"
        backColor="blue"
        downColor="white"
      />
      <Box
        ref={boxRefs[25]}
        position={[0, -1, -1]}
        backColor="blue"
        downColor="white"
      />
      <Box
        ref={boxRefs[26]}
        position={[1, -1, -1]}
        rightColor="orange"
        backColor="blue"
        downColor="white"
      />
    </React.Suspense>
  )
})

export default Cube
