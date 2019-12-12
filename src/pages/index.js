import React from 'react'
import { Canvas } from 'react-three-fiber'
import Cube from 'components/cube'
import OrbitControls from 'components/orbit-controls'
import CubeControls from 'components/cube-controls'
import './style.css'

export default function IndexPage() {
  const cubeRef = React.useRef()

  function onControlClick(faceName, inversed) {
    if (cubeRef.current) {
      cubeRef.current.rotate(faceName, inversed)
    }
  }

  return (
    <>
      <Canvas camera={{ position: [6, 6, 6] }}>
        <OrbitControls />
        <Cube ref={cubeRef} />
      </Canvas>
      <CubeControls onControlClick={onControlClick} />
    </>
  )
}
