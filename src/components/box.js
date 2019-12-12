import React from 'react'
import usePegatineTextures from '../hooks/use-pegatine-textures'

/**
 * material faces: [RIGHT, LEFT, UP, DOWN, FRONT, BACK]
 */
const Box = React.forwardRef((props, ref) => {
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

  function getMaterialProps(faceColor) {
    if (!faceColor) {
      return { color: 'black' }
    }

    return { map: textures[faceColor] }
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

Box.displayName = 'Box'

export default Box
