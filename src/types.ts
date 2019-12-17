import * as THREE from 'three'

export type FaceName = 'U' | 'D' | 'L' | 'R' | 'F' | 'B' | 'M' | 'E' | 'S'

export type SliceName = 'M' | 'S' | 'E'

export type ControlName =
  | 'front'
  | 'down'
  | 'right'
  | 'back'
  | 'up'
  | 'left'
  | 'middle'
  | 'standing'
  | 'equatorial'

export interface PegatineTextures {
  red: THREE.Texture
  orange: THREE.Texture
  blue: THREE.Texture
  green: THREE.Texture
  white: THREE.Texture
  yellow: THREE.Texture
}

export type PegatineColor = keyof PegatineTextures

export interface Move {
  faceName: FaceName
  inversed: boolean
}

export type User = {
  [key: string]: any
}

export interface ApiClient {
  logIn(email: string, password: string): Promise<void>
  logOut(): Promise<void>
  onAuth(callback: (u: User | null) => void): () => void
}
