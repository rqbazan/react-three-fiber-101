import React from 'react'
import { Canvas } from 'react-three-fiber'
import Cube from './cube'
import OrbitControls from './orbit-controls'

export default function Scene() {
  return (
    <Canvas style={{ background: '#efefde' }} camera={{ position: [6, 6, 6] }}>
      <OrbitControls />
      <Cube />
    </Canvas>
  )
}
