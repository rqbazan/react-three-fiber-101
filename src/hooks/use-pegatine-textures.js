import React from 'react'
import * as THREE from 'three'

export default function usePegatineTextures() {
  return React.useMemo(() => {
    const loader = new THREE.TextureLoader()

    return {
      red: loader.load('textures/red-pegatine.png'),
      orange: loader.load('textures/orange-pegatine.png'),
      blue: loader.load('textures/blue-pegatine.png'),
      green: loader.load('textures/green-pegatine.png'),
      white: loader.load('textures/white-pegatine.png'),
      yellow: loader.load('textures/yellow-pegatine.png')
    }
  }, [])
}
