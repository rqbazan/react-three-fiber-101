import React from 'react'
import cs from 'classnames'
import cloneDeep from 'lodash.clonedeep'
import intersection from 'lodash.intersection'
import { FaceName, SliceName, ControlName } from 'types'
import Icon from 'components/icon'
import rotateArray from 'utils/rotate-array'
import Cube from 'entities/cube'
import ControlButton from '../control'
import styles from './styles.module.css'

interface Control {
  targetFaceName: FaceName
  color?: string
}

type Controls = {
  [key in ControlName]: Control
}

function isSliceName(name: FaceName): name is SliceName {
  return 'MSE'.includes(name)
}

const initControls: Controls = {
  front: { targetFaceName: 'F', color: 'green' },
  down: { targetFaceName: 'D', color: 'white' },
  right: { targetFaceName: 'R', color: 'orange' },
  back: { targetFaceName: 'B', color: 'blue' },
  up: { targetFaceName: 'U', color: 'yellow' },
  left: { targetFaceName: 'L', color: 'red' },
  middle: { targetFaceName: 'M' },
  standing: { targetFaceName: 'S' },
  equatorial: { targetFaceName: 'E' }
}

const controlNamesBySlice: { [key in SliceName]: ControlName[] } = {
  M: ['back', 'down', 'front', 'up'],
  S: ['left', 'down', 'right', 'up'],
  E: ['left', 'back', 'right', 'front']
}

interface CubeControlsProps {
  onControlClick(faceName: FaceName, inversed: boolean): void
}

export default function CubeControls({ onControlClick }: CubeControlsProps) {
  const [controls, setControls] = React.useState<Controls>(initControls)

  function reOrderSlices(sliceName: SliceName, inversed: boolean) {
    const newPositions = rotateArray(controlNamesBySlice[sliceName], !inversed)

    Cube.sliceNames
      .filter(name => name !== sliceName)
      .forEach(affectedSliceName => {
        const newNames = cloneDeep(controlNamesBySlice[affectedSliceName])

        intersection(
          controlNamesBySlice[sliceName],
          controlNamesBySlice[affectedSliceName]
        ).forEach(affectedControlName => {
          const controlNameIndex = controlNamesBySlice[sliceName].findIndex(
            v => v === affectedControlName
          )

          const index = newNames.findIndex(v => v === affectedControlName)
          newNames[index] = newPositions[controlNameIndex]
        })

        controlNamesBySlice[affectedSliceName] = newNames
      })
  }

  function reOrderControls(sliceName: SliceName, inversed: boolean) {
    setControls(prevControls => {
      const newControls = cloneDeep(prevControls)
      const positions = controlNamesBySlice[sliceName]

      const newPositions = rotateArray(positions, inversed)

      newPositions.forEach((newPosition, index) => {
        newControls[positions[index]].targetFaceName =
          prevControls[newPosition].targetFaceName
      })

      reOrderSlices(sliceName, inversed)

      return newControls
    })
  }

  function onClick(faceName: FaceName, inversed: boolean) {
    if (isSliceName(faceName)) {
      reOrderControls(faceName, inversed)
    }

    onControlClick(faceName, inversed)
  }

  const controlNames = Object.keys(controls) as ControlName[]

  return (
    <>
      <div className={cs(styles.container, styles.left)}>
        {controlNames.map(name => {
          const { color, targetFaceName } = controls[name]

          return (
            <ControlButton
              key={`for-${name}-counterclokwise`}
              color={color}
              onClick={() => onClick(targetFaceName, true)}
            >
              {color ? <Icon name="counterclockwise" /> : `${targetFaceName}'`}
            </ControlButton>
          )
        })}
      </div>
      <div className={cs(styles.container, styles.right)}>
        {controlNames.map(name => {
          const { color, targetFaceName } = controls[name]

          return (
            <ControlButton
              key={`for-${name}-clokwise`}
              color={color}
              onClick={() => onClick(targetFaceName, false)}
            >
              {color ? <Icon name="clockwise" /> : targetFaceName}
            </ControlButton>
          )
        })}
      </div>
    </>
  )
}
