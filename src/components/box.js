import React from 'react'
import usePegatineTextures from '../hooks/use-pegatine-textures'

/**
 * material sides: [RIGHT, LEFT, UP, DOWN, FRONT, BACK]
 */

export default function Box({
  position,
  rightColor,
  leftColor,
  upColor,
  downColor,
  frontColor,
  backColor
}) {
  const textures = usePegatineTextures()

  return (
    <mesh position={position}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshBasicMaterial
        attachArray="material"
        color={!rightColor ? 'black' : undefined}
        map={textures[rightColor]}
      />
      <meshBasicMaterial
        attachArray="material"
        color={!leftColor ? 'black' : undefined}
        map={textures[leftColor]}
      />
      <meshBasicMaterial
        attachArray="material"
        color={!upColor ? 'black' : undefined}
        map={textures[upColor]}
      />
      <meshBasicMaterial
        attachArray="material"
        color={!downColor ? 'black' : undefined}
        map={textures[downColor]}
      />
      <meshBasicMaterial
        attachArray="material"
        color={!frontColor ? 'black' : undefined}
        map={textures[frontColor]}
      />
      <meshBasicMaterial
        attachArray="material"
        color={!backColor ? 'black' : undefined}
        map={textures[backColor]}
      />
    </mesh>
  )
}
