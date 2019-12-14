import React from 'react'
import { FaceName } from 'types'
import RoundedButton from '../rounded-button'

const styles = require('./styles.module.css')

interface CubeControlsProps {
  onControlClick(faceName: FaceName, inversed: boolean): void
}

export default function CubeControls({ onControlClick }: CubeControlsProps) {
  function onClick(e: any) {
    const faceName = e.target.dataset.face[0]
    const inversed = e.target.dataset.face.endsWith("'")
    onControlClick(faceName, inversed)
  }

  return (
    <>
      <div className={`${styles.container} ${styles.left}`}>
        <RoundedButton
          data-face="F"
          className="bg-pegatine-green"
          onClick={onClick}
        >
          F
        </RoundedButton>
        <RoundedButton
          data-face="D"
          className="bg-pegatine-white"
          onClick={onClick}
        >
          D
        </RoundedButton>
        <RoundedButton
          data-face="R"
          className="bg-pegatine-orange"
          onClick={onClick}
        >
          R
        </RoundedButton>
        <RoundedButton
          data-face="B"
          className="bg-pegatine-blue"
          onClick={onClick}
        >
          B
        </RoundedButton>
        <RoundedButton
          data-face="U"
          className="bg-pegatine-yellow"
          onClick={onClick}
        >
          U
        </RoundedButton>
        <RoundedButton
          data-face="L"
          className="bg-pegatine-red"
          onClick={onClick}
        >
          L
        </RoundedButton>
        <RoundedButton
          data-face="M"
          className="bg-black text-white"
          onClick={onClick}
        >
          M
        </RoundedButton>
        <RoundedButton
          data-face="S"
          className="bg-black text-white"
          onClick={onClick}
        >
          S
        </RoundedButton>
        <RoundedButton
          data-face="E"
          className="bg-black text-white"
          onClick={onClick}
        >
          E
        </RoundedButton>
      </div>
      <div className={`${styles.container} ${styles.right}`}>
        <RoundedButton
          data-face="F'"
          className="bg-pegatine-green"
          onClick={onClick}
        >
          F&apos;
        </RoundedButton>
        <RoundedButton
          data-face="D'"
          className="bg-pegatine-white"
          onClick={onClick}
        >
          D&apos;
        </RoundedButton>
        <RoundedButton
          data-face="R'"
          className="bg-pegatine-orange"
          onClick={onClick}
        >
          R&apos;
        </RoundedButton>
        <RoundedButton
          data-face="B'"
          className="bg-pegatine-blue"
          onClick={onClick}
        >
          B&apos;
        </RoundedButton>
        <RoundedButton
          data-face="U'"
          className="bg-pegatine-yellow"
          onClick={onClick}
        >
          U&apos;
        </RoundedButton>
        <RoundedButton
          data-face="L'"
          className="bg-pegatine-red"
          onClick={onClick}
        >
          L&apos;
        </RoundedButton>
        <RoundedButton
          data-face="M'"
          className="bg-black text-white"
          onClick={onClick}
        >
          M&apos;
        </RoundedButton>
        <RoundedButton
          data-face="S'"
          className="bg-black text-white"
          onClick={onClick}
        >
          S&apos;
        </RoundedButton>
        <RoundedButton
          data-face="E'"
          className="bg-black text-white"
          onClick={onClick}
        >
          E&apos;
        </RoundedButton>
      </div>
    </>
  )
}