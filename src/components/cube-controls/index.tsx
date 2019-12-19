import React from 'react'
import cs from 'classnames'
import cloneDeep from 'lodash.clonedeep'
import intersection from 'lodash.intersection'
import rotateArray from '~/utils/rotate-array'
import Cube from '~/entities/cube'
import { FaceName, SliceName, ControlName, Move } from '~/types'
import Icon, { IconName } from '../icon'
import ControlButton from '../control-button'
import styles from './styles.module.css'

interface Control {
  targetFaceName: FaceName
  color?: string
}

interface CubeControlsState {
  controls: { [key in ControlName]: Control }
  positions: { [key in SliceName]: ControlName[] }
}

export interface CubeControlsProps {
  onControlClick(faceName: FaceName, inversed: boolean): void
  preferLetters?: boolean
}

const initState: CubeControlsState = {
  controls: {
    front: { targetFaceName: 'F', color: 'green' },
    down: { targetFaceName: 'D', color: 'white' },
    right: { targetFaceName: 'R', color: 'orange' },
    back: { targetFaceName: 'B', color: 'blue' },
    up: { targetFaceName: 'U', color: 'yellow' },
    left: { targetFaceName: 'L', color: 'red' },
    middle: { targetFaceName: 'M' },
    standing: { targetFaceName: 'S' },
    equatorial: { targetFaceName: 'E' }
  },
  positions: {
    M: ['back', 'down', 'front', 'up'],
    S: ['left', 'down', 'right', 'up'],
    E: ['left', 'back', 'right', 'front']
  }
}

function isSliceName(name: FaceName): name is SliceName {
  return 'MSE'.includes(name)
}

function reOrderTargetControls(
  state: CubeControlsState,
  move: Move<SliceName>
) {
  const { faceName: sliceName, inversed } = move

  const newState = cloneDeep(state)
  const positions = state.positions[sliceName]

  rotateArray(positions, inversed).forEach((newPosition, index) => {
    newState.controls[positions[index]].targetFaceName =
      state.controls[newPosition].targetFaceName
  })

  const newControlsNames = rotateArray(state.positions[sliceName], !inversed)

  Cube.sliceNames
    .filter(name => name !== sliceName)
    .forEach(affectedSliceName => {
      const newPositions = newState.positions
      const newNames = cloneDeep(newPositions[affectedSliceName])

      intersection(
        newPositions[sliceName],
        newPositions[affectedSliceName]
      ).forEach(affectedControlName => {
        const controlNameIndex = newPositions[sliceName].findIndex(
          v => v === affectedControlName
        )

        const index = newNames.findIndex(v => v === affectedControlName)
        newNames[index] = newControlsNames[controlNameIndex]
      })

      newPositions[affectedSliceName] = newNames
    })

  return newState
}

export default function CubeControls({
  onControlClick,
  preferLetters = false
}: CubeControlsProps) {
  const [state, setState] = React.useState<CubeControlsState>(initState)

  function onClick(faceName: FaceName, inversed: boolean) {
    if (isSliceName(faceName)) {
      setState(prevState =>
        reOrderTargetControls(prevState, { faceName, inversed })
      )
    }

    onControlClick(faceName, inversed)
  }

  const renderControlButton = (name: ControlName, inversed: boolean) => {
    const { color, targetFaceName } = state.controls[name]
    const displayName = inversed ? `${targetFaceName}'` : targetFaceName

    const iconName: IconName = inversed ? 'counterclockwise' : 'clockwise'
    const noIcon = preferLetters || !color

    return (
      <ControlButton
        data-testid={name}
        key={`for-${name}-counterclokwise`}
        color={color}
        onClick={() => onClick(targetFaceName, inversed)}
      >
        {noIcon ? displayName : <Icon name={iconName} />}
      </ControlButton>
    )
  }

  const controlNames = Object.keys(state.controls) as ControlName[]

  return (
    <>
      <div className={cs(styles.container, styles.left)}>
        {controlNames.map(name => renderControlButton(name, true))}
      </div>
      <div className={cs(styles.container, styles.right)}>
        {controlNames.map(name => renderControlButton(name, false))}
      </div>
    </>
  )
}
