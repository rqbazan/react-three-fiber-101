import React from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, useThree, extend } from 'react-three-fiber'
import Cube from '../components/cube'
import './style.css'

extend({ OrbitControls })

function Controls() {
  const { camera, gl } = useThree()

  return <orbitControls args={[camera, gl.domElement]} />
}

export default () => {
  return (
    <Canvas style={{ background: '#efefde' }} camera={{ position: [6, 6, 6] }}>
      <Controls />
      <Cube />
    </Canvas>
  )
}
