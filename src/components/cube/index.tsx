import React from 'react'
import * as THREE from 'three'
import { FaceName } from 'types'
import { useRender } from 'react-three-fiber'
import getRandomMoves from 'utils/get-random-moves'
import useRefs from 'hooks/use-refs'
import CubeEntity from 'entities/cube'
import MoveEntity from 'entities/move'
import { rotateAroundWorldAxis } from './helpers'
import { facesMeta } from './meta'
import Box from '../box'

export interface CubeRef {
  rotateFace(faceName: FaceName, inversed: boolean): void
  scrambleFaces(): void
}

const defaultStepAngle = 6

const Cube = React.forwardRef<CubeRef, {}>((_, ref) => {
  const boxRefs = useRefs<THREE.Mesh>(27)
  const moveEntityRef = React.useRef<MoveEntity>()
  const cubeEntityRef = React.useRef<CubeEntity>(new CubeEntity())

  const rotateMeshs = (faceName: FaceName, degrees: number) => {
    const facePieces = cubeEntityRef.current.faces[faceName]

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
        THREE.Math.degToRad(degrees)
      )
    }
  }

  const rotateFace = async (
    faceName: FaceName,
    inversed: boolean,
    stepAngle = defaultStepAngle
  ) => {
    if (moveEntityRef.current) {
      return Promise.resolve()
    }

    return new Promise(resolve => {
      moveEntityRef.current = new MoveEntity(faceName, inversed, stepAngle)

      moveEntityRef.current.onComplete(() => {
        cubeEntityRef.current.rotate(faceName, inversed)
        moveEntityRef.current = undefined
        resolve()
      })

      moveEntityRef.current.onProgress(move => {
        const targetSign = Math.sign(move.targetAngle)
        const rotationFactor = facesMeta[faceName].inverse
          ? -targetSign
          : targetSign
        rotateMeshs(faceName, stepAngle * rotationFactor)
      })
    })
  }

  const scrambleFaces = async () => {
    const moves = getRandomMoves(20)
    for (let i = 0; i < moves.length; i++) {
      const { faceName, inversed } = moves[i]
      // eslint-disable-next-line
      await rotateFace(faceName, inversed, defaultStepAngle * 3)
    }
  }

  useRender(() => {
    if (moveEntityRef.current) {
      moveEntityRef.current.run()
    }
  }, false)

  React.useImperativeHandle(ref, () => ({
    rotateFace,
    scrambleFaces
  }))

  React.useEffect(() => {
    return () => {
      // clean up the promise
      if (moveEntityRef.current) {
        moveEntityRef.current.complete()
      }
    }
  }, [])

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
