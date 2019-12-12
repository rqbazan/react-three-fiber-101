import React from 'react'
import * as THREE from 'three'
import { useRender } from 'react-three-fiber'
import useHotKeys from 'hooks/use-hot-keys'
import useRefs from 'hooks/use-refs'
import CubeEntity from 'entities/cube'
import Box from './box'

const cube = new CubeEntity()

const facesMeta = {
  U: {
    axis: CubeEntity.axis.Y,
    inverse: true
  },
  D: {
    axis: CubeEntity.axis.Y,
    inverse: false
  },
  R: {
    axis: CubeEntity.axis.X,
    inverse: true
  },
  L: {
    axis: CubeEntity.axis.X,
    inverse: false
  },
  F: {
    axis: CubeEntity.axis.Z,
    inverse: true
  },
  B: {
    axis: CubeEntity.axis.Z,
    inverse: false
  }
}

function rotateAroundWorldAxis(mesh, axis, radians) {
  const axisVector = new THREE.Vector3(...axis)
  const quaternion = new THREE.Quaternion()

  quaternion.setFromAxisAngle(axisVector, radians)

  mesh.quaternion.multiplyQuaternions(quaternion, mesh.quaternion)
  mesh.position.sub(axisVector)
  mesh.position.applyQuaternion(quaternion)
  mesh.position.add(axisVector)
}

const Cube = React.forwardRef((_, ref) => {
  const boxRefs = useRefs(26)
  const moveRef = React.useRef(null)

  function rotateMeshs(faceName, angle) {
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
        boxRefs[piece.key].current,
        facesMeta[faceName].axis,
        THREE.Math.degToRad(angle)
      )
    }
  }

  function onKeyPress(shiftKeyPressed, faceName) {
    if (moveRef.current) {
      return
    }

    const targetAngle = shiftKeyPressed
      ? CubeEntity.angles.ANTICLOCKWISE
      : CubeEntity.angles.CLOCKWISE

    moveRef.current = {
      targetAngle,
      faceName,
      currentAngle: 0
    }
  }

  useHotKeys({
    KeyU: onKeyPress,
    KeyD: onKeyPress,
    KeyR: onKeyPress,
    KeyL: onKeyPress,
    KeyF: onKeyPress,
    KeyB: onKeyPress
  })

  useRender(() => {
    const velocity = 6
    const move = moveRef.current

    if (move) {
      const { faceName, targetAngle } = move
      const faceMeta = facesMeta[faceName]

      if (move.currentAngle === move.targetAngle) {
        cube.rotate(faceName, targetAngle)
        moveRef.current = null
        return
      }

      const targetSign = Math.sign(targetAngle)
      const rotationFactor = faceMeta.inverse ? -targetSign : targetSign

      rotateMeshs(faceName, velocity * rotationFactor)

      moveRef.current.currentAngle += velocity * targetSign
    }
  })

  React.useImperativeHandle(ref, () => ({
    rotate90(faceName) {
      onKeyPress(false, faceName)
    }
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
})

export default Cube
