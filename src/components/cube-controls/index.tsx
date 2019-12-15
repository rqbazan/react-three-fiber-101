import React from 'react'
import cloneDeep from 'lodash.clonedeep'
import { FaceName, SliceName, ControlName } from 'types'
import rotateArray from 'utils/rotate-array'
import ControlButton from '../control'

// const ClockwiseIcon = require('icons/clockwise.svg').default
// const CounterClockwiseIcon = require('icons/counter-clockwise.svg').default
const styles = require('./styles.module.css')

interface Control {
  faceName: FaceName
  fixed: FaceName
  color?: string
}

type Controls = {
  [key in ControlName]: Control
}

function isSliceName(name: FaceName): name is SliceName {
  return 'MSE'.includes(name)
}

const initControls: Controls = {
  front: { fixed: 'F', faceName: 'F', color: 'green' },
  down: { fixed: 'D', faceName: 'D', color: 'white' },
  right: { fixed: 'R', faceName: 'R', color: 'orange' },
  back: { fixed: 'B', faceName: 'B', color: 'blue' },
  up: { fixed: 'U', faceName: 'U', color: 'yellow' },
  left: { fixed: 'L', faceName: 'L', color: 'red' },
  middle: { fixed: 'M', faceName: 'M' },
  standing: { fixed: 'S', faceName: 'S' },
  equatorial: { fixed: 'E', faceName: 'E' }
}

const controlNamesBySlice: { [key in SliceName]: ControlName[] } = {
  M: ['back', 'down', 'front', 'up'],
  S: ['back', 'down', 'front', 'up'],
  E: ['left', 'back', 'right', 'front']
}

interface CubeControlsProps {
  onControlClick(faceName: FaceName, inversed: boolean): void
}

export default function CubeControls({ onControlClick }: CubeControlsProps) {
  const [controls, setControls] = React.useState<Controls>(initControls)

  function reOrderControls(sliceName: SliceName, inversed: boolean) {
    setControls(prevControls => {
      const newControls = cloneDeep(prevControls)
      const positions = controlNamesBySlice[sliceName]

      const newPositions = rotateArray(positions, inversed)

      newPositions.forEach((newPosition, index) => {
        newControls[positions[index]].faceName = newControls[newPosition].fixed
      })

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
      <div className={`${styles.container} ${styles.left}`}>
        {controlNames.map(name => {
          const { color, faceName } = controls[name]

          return (
            <ControlButton
              key={`for-${name}-clokwise`}
              color={color}
              onClick={() => onClick(faceName, false)}
            >
              {faceName}
            </ControlButton>
          )
        })}
      </div>
      <div className={`${styles.container} ${styles.right}`}>
        {controlNames.map(name => {
          const { color, faceName } = controls[name]

          return (
            <ControlButton
              key={`for-${name}-counterclokwise`}
              color={color}
              onClick={() => onClick(faceName, true)}
            >
              {`${faceName}'`}
            </ControlButton>
          )
        })}
      </div>
    </>
  )
}
