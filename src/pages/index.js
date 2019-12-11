import React from 'react'
import { Canvas } from 'react-three-fiber'
import Cube from 'components/cube'
import OrbitControls from 'components/orbit-controls'
import './style.css'

export default function IndexPage() {
  return (
    <Canvas style={{ background: '#efefde' }} camera={{ position: [6, 6, 6] }}>
      <OrbitControls />
      <Cube />
    </Canvas>
  )
}
