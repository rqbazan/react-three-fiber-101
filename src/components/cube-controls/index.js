import React from 'react'
import RoundedButton from '../rounded-button'
import './style.css'

export default function CubeControls({ onControlClick }) {
  function onClick(e) {
    onControlClick(e.target.dataset.face)
  }

  return (
    <div className="btns-container">
      <div className="flex flex-col md:flex-row btns-group">
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
      </div>
      <div className="flex flex-col md:flex-row btns-group">
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
      </div>
    </div>
  )
}
