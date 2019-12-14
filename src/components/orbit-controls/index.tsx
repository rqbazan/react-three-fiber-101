import React from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useThree, extend } from 'react-three-fiber'

extend({ OrbitControls })

export default function Controls() {
  const { camera, gl } = useThree()

  return <orbitControls args={[camera, gl.domElement]} />
}
