import React from 'react'
import * as THREE from 'three'
import { useRender } from 'react-three-fiber'
import useHotKeys from 'hooks/use-hot-keys'
import useRefs from 'hooks/use-refs'
import CubeEntity from 'entities/cube'
import Box from './box'

const cube = new CubeEntity()

function rotateAroundWorldAxis(mesh, axis, radians) {
  const axisVector = new THREE.Vector3(...axis)
  const quaternion = new THREE.Quaternion()

  quaternion.setFromAxisAngle(axisVector, radians)

  mesh.quaternion.multiplyQuaternions(quaternion, mesh.quaternion)
  mesh.position.sub(axisVector)
  mesh.position.applyQuaternion(quaternion)
  mesh.position.add(axisVector)
}

function getTargetAngle(shiftKeyPressed) {
  return shiftKeyPressed
    ? CubeEntity.angles.ANTICLOCKWISE
    : CubeEntity.angles.CLOCKWISE
}

export default function Cube() {
  const boxRefs = useRefs(26)
  const moveRef = React.useRef(null)

  function rotate(facePieces, axis, angle) {
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
        boxRefs[piece.key].current,
        axis,
        THREE.Math.degToRad(angle)
      )
    }
  }

  useHotKeys({
    KeyU: shiftKeyPressed => {
      if (moveRef.current) {
        return
      }

      const targetAngle = getTargetAngle(shiftKeyPressed)

      moveRef.current = {
        targetAngle,
        currentAngle: 0,
        axisRotationFactor: -1,
        faceName: 'UP',
        axisName: 'Y'
      }
    },
    KeyD: shiftKeyPressed => {
      if (moveRef.current) {
        return
      }

      const targetAngle = getTargetAngle(shiftKeyPressed)

      moveRef.current = {
        targetAngle,
        currentAngle: 0,
        axisRotationFactor: 1,
        faceName: 'DOWN',
        axisName: 'Y'
      }
    },
    KeyR: shiftKeyPressed => {
      if (moveRef.current) {
        return
      }

      const targetAngle = getTargetAngle(shiftKeyPressed)

      moveRef.current = {
        targetAngle,
        currentAngle: 0,
        axisRotationFactor: -1,
        faceName: 'RIGHT',
        axisName: 'X'
      }
    },
    KeyL: shiftKeyPressed => {
      if (moveRef.current) {
        return
      }

      const targetAngle = getTargetAngle(shiftKeyPressed)

      moveRef.current = {
        targetAngle,
        currentAngle: 0,
        axisRotationFactor: 1,
        faceName: 'LEFT',
        axisName: 'X'
      }
    },
    KeyF: shiftKeyPressed => {
      if (moveRef.current) {
        return
      }

      const targetAngle = getTargetAngle(shiftKeyPressed)

      moveRef.current = {
        targetAngle,
        currentAngle: 0,
        axisRotationFactor: -1,
        faceName: 'FRONT',
        axisName: 'Z'
      }
    },
    KeyB: shiftKeyPressed => {
      if (moveRef.current) {
        return
      }

      const targetAngle = getTargetAngle(shiftKeyPressed)

      moveRef.current = {
        targetAngle,
        currentAngle: 0,
        axisRotationFactor: 1,
        faceName: 'BACK',
        axisName: 'Z'
      }
    }
  })

  useRender(() => {
    const velocity = 6
    const move = moveRef.current

    if (move) {
      const { faceName, axisName, axisRotationFactor, targetAngle } = move

      if (move.currentAngle === move.targetAngle) {
        cube.rotate(faceName, targetAngle)
        moveRef.current = null
        return
      }

      const newAngle = velocity * (axisRotationFactor * Math.sign(targetAngle))
      rotate(cube.faces[faceName], CubeEntity.axisVectors[axisName], newAngle)

      moveRef.current.currentAngle += velocity * Math.sign(targetAngle)
    }
  })

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
      <Box ref={boxRefs[13]} position={[1, 0, 0]} rightColor="orange" />
      <Box
        ref={boxRefs[14]}
        position={[-1, -1, 0]}
        leftColor="red"
        downColor="white"
      />
      <Box ref={boxRefs[15]} position={[0, -1, 0]} downColor="white" />
      <Box
        ref={boxRefs[16]}
        position={[1, -1, 0]}
        rightColor="orange"
        downColor="white"
      />
      <Box
        ref={boxRefs[17]}
        position={[-1, 1, -1]}
        backColor="blue"
        upColor="yellow"
        leftColor="red"
      />
      <Box
        ref={boxRefs[18]}
        position={[0, 1, -1]}
        backColor="blue"
        upColor="yellow"
      />
      <Box
        ref={boxRefs[19]}
        position={[1, 1, -1]}
        backColor="blue"
        upColor="yellow"
        rightColor="orange"
      />
      <Box
        ref={boxRefs[20]}
        position={[-1, 0, -1]}
        backColor="blue"
        leftColor="red"
      />
      <Box ref={boxRefs[21]} position={[0, 0, -1]} backColor="blue" />
      <Box
        ref={boxRefs[22]}
        position={[1, 0, -1]}
        backColor="blue"
        rightColor="orange"
      />
      <Box
        ref={boxRefs[23]}
        position={[-1, -1, -1]}
        leftColor="red"
        backColor="blue"
        downColor="white"
      />
      <Box
        ref={boxRefs[24]}
        position={[0, -1, -1]}
        backColor="blue"
        downColor="white"
      />
      <Box
        ref={boxRefs[25]}
        position={[1, -1, -1]}
        rightColor="orange"
        backColor="blue"
        downColor="white"
      />
    </React.Suspense>
  )
}
