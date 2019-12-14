import * as THREE from 'three'
import { useLoader } from 'react-three-fiber'

export interface PegatineTextures {
  red: THREE.Texture
  orange: THREE.Texture
  blue: THREE.Texture
  green: THREE.Texture
  white: THREE.Texture
  yellow: THREE.Texture
}

export type PegatineColor = keyof PegatineTextures

export default function usePegatineTextures(): PegatineTextures {
  // eslint-disable-next-line
  // @ts-ignore
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
