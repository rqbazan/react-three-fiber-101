import React from 'react'
import Button from '../button'
import './style.css'

export default function CubeControls({ onControlClick }) {
  function onClick(e) {
    onControlClick(e.target.dataset.face)
  }

  return (
    <div className="btns-container">
      <div className="flex flex-col md:flex-row btns-group">
        <Button data-face="F" className="bg-pegatine-green" onClick={onClick}>
          F
        </Button>
        <Button data-face="D" className="bg-pegatine-white" onClick={onClick}>
          D
        </Button>
        <Button data-face="R" className="bg-pegatine-orange" onClick={onClick}>
          R
        </Button>
      </div>
      <div className="flex flex-col md:flex-row btns-group">
        <Button data-face="B" className="bg-pegatine-blue" onClick={onClick}>
          B
        </Button>
        <Button data-face="U" className="bg-pegatine-yellow" onClick={onClick}>
          U
        </Button>
        <Button data-face="L" className="bg-pegatine-red" onClick={onClick}>
          L
        </Button>
      </div>
    </div>
  )
}
