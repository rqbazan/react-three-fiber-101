import React from 'react'
import ClockwiseIcon from 'icons/clockwise.svg'
import CounterClockwiseIcon from 'icons/counter-clockwise.svg'
import RoundedButton from '../rounded-button'
import styles from './styles.module.css'

const initControls = {
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

const initSlices = {
  M: ['F', 'U', 'B', 'D'],
  S: ['L', 'U', 'B', 'D'],
  E: ['R', 'F', 'L', 'B']
}

function getControlClassName(control) {
  if (control.color) {
    return `bg-pegatine-${control.color}`
  }

  return 'bg-black text-white'
}

export default function CubeControls({ onControlClick }) {
  const [slices, setSlices] = React.useState(initSlices)
  const [controls, setControls] = React.useState(initControls)

  function onClick(e) {
    const faceName = e.target.dataset.face[0]
    const inversed = e.target.dataset.face.endsWith("'")

    onControlClick(faceName, inversed)

    if ('MSE'.includes(faceName)) {
      let newFaceNames
      const faceNames = slices[faceName]

      if (inversed) {
        newFaceNames = [faceNames[3], ...faceNames.slice(1)]
      } else {
        newFaceNames = [...faceNames.slice(1), faceNames[0]]
      }

      for (let i = 0; i < 4; i += 1) {
        controls[newFaceNames[i]].face = faceNames[i]
      }
      slices[faceName] = newFaceNames

      setControls({ ...controls })
      setSlices({ ...slices })
    }
  }

  return (
    <>
      <div className={`${styles.container} ${styles.left}`}>
        {Object.keys(controls).map(key => {
          const control = controls[key]

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
          const control = controls[key]
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
