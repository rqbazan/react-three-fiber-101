import * as THREE from 'three'
import { useLoader } from 'react-three-fiber'

export default function usePegatineTextures() {
  const [
    red,
    orange,
    blue,
    green,
    white,
    yellow
  ] = useLoader(THREE.TextureLoader, [
    'textures/red-pegatine.png',
    'textures/orange-pegatine.png',
    'textures/blue-pegatine.png',
    'textures/green-pegatine.png',
    'textures/white-pegatine.png',
    'textures/yellow-pegatine.png'
  ])

  return { red, orange, blue, green, white, yellow }
}
