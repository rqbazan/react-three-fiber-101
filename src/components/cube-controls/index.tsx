import React, { FC } from 'react'
import { FaceName, PegatineColor } from 'types'
import RoundedButton from '../rounded-button'

const ClockwiseIcon = require('icons/clockwise.svg').default
const CounterClockwiseIcon = require('icons/counter-clockwise.svg').default
const styles = require('./styles.module.css')

interface Control {
  face: FaceName
  color?: PegatineColor
}

type Controls = {
  [key in FaceName]: Control
}

const initControls: Controls = {
  F: { face: 'F', color: 'green' },
  D: { face: 'D', color: 'white' },
  R: { face: 'R', color: 'orange' },
  B: { face: 'B', color: 'blue' },
  U: { face: 'U', color: 'yellow' },
  L: { face: 'L', color: 'red' },
  M: { face: 'M' },
  S: { face: 'S' },
  E: { face: 'E' }
}

function getControlClassName(control: Control): string {
  if (control.color) {
    return `bg-pegatine-${control.color}`
  }

  return 'bg-black text-white'
}

interface CubeControlsProps {
  onControlClick(faceName: FaceName, inversed: boolean): void
}

export default function CubeControls({ onControlClick }: CubeControlsProps) {
  const controls = initControls

  function onClick(e: any) {
    const faceName = e.target.dataset.face[0]
    const inversed = e.target.dataset.face.endsWith("'")

    onControlClick(faceName, inversed)
  }

  return (
    <>
      <div className={`${styles.container} ${styles.left}`}>
        {Object.keys(controls).map(key => {
          const control = controls[key as FaceName]

          return (
            <RoundedButton
              key={`control-for-${key}`}
              data-face={control.face}
              className={getControlClassName(control)}
              onClick={onClick}
            >
              {control.color ? <ClockwiseIcon /> : control.face}
            </RoundedButton>
          )
        })}
      </div>
      <div className={`${styles.container} ${styles.right}`}>
        {Object.keys(controls).map(key => {
          const control = controls[key as FaceName]
          const faceName = `${control.face}'`

          return (
            <RoundedButton
              key={`control-for-${key}-inversed`}
              data-face={faceName}
              className={getControlClassName(control)}
              onClick={onClick}
            >
              {control.color ? <CounterClockwiseIcon /> : faceName}
            </RoundedButton>
          )
        })}
      </div>
    </>
  )
}
