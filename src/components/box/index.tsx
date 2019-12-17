import React from 'react'
import usePegatineTextures from '~/hooks/use-pegatine-textures'
import { PegatineColor } from '~/types'

interface BoxProps {
  position: [number, number, number]
  rightColor?: PegatineColor
  leftColor?: PegatineColor
  upColor?: PegatineColor
  downColor?: PegatineColor
  frontColor?: PegatineColor
  backColor?: PegatineColor
}

type MaterialProps = { color: string } | { map: THREE.Texture }

/**
 * material faces: [RIGHT, LEFT, UP, DOWN, FRONT, BACK]
 */
const Box = React.forwardRef<any, BoxProps>((props, ref) => {
  const {
    position,
    rightColor,
    leftColor,
    upColor,
    downColor,
    frontColor,
    backColor
  } = props

  const textures = usePegatineTextures()

  function getMaterialProps(faceColor?: PegatineColor): MaterialProps {
    if (!faceColor) {
      return { color: 'black' }
    }

    return { map: textures[faceColor] as THREE.Texture }
  }

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshBasicMaterial
        attachArray="material"
        {...getMaterialProps(rightColor)}
      />
      <meshBasicMaterial
        attachArray="material"
        {...getMaterialProps(leftColor)}
      />
      <meshBasicMaterial
        attachArray="material"
        {...getMaterialProps(upColor)}
      />
      <meshBasicMaterial
        attachArray="material"
        {...getMaterialProps(downColor)}
      />
      <meshBasicMaterial
        attachArray="material"
        {...getMaterialProps(frontColor)}
      />
      <meshBasicMaterial
        attachArray="material"
        {...getMaterialProps(backColor)}
      />
    </mesh>
  )
})

export default Box
