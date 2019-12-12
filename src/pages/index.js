import React from 'react'
import Scene from 'components/scene'
import Button from 'components/button'
import './style.css'

export default function IndexPage() {
  return (
    <>
      <Scene />
      <div className="btns-container">
        <div className="flex flex-col md:flex-row btns-group">
          <Button className="bg-green">F</Button>
          <Button className="bg-white">D</Button>
          <Button className="bg-red">R</Button>
        </div>
        <div className="flex flex-col md:flex-row btns-group">
          <Button className="bg-blue">B</Button>
          <Button className="bg-yellow">U</Button>
          <Button className="bg-orange">L</Button>
        </div>
      </div>
    </>
  )
}
