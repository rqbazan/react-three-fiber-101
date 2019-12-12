import React from 'react'
import { Canvas } from 'react-three-fiber'
import Button from 'components/button'
import Cube from 'components/cube'
import OrbitControls from 'components/orbit-controls'
import './style.css'

export default function IndexPage() {
  const cubeRef = React.useRef()

  function getOnBtnClick(faceName) {
    return () => {
      if (cubeRef.current) {
        cubeRef.current.rotate(faceName)
      }
    }
  }

  return (
    <>
      <Canvas
        style={{ background: '#efefde' }}
        camera={{ position: [6, 6, 6] }}
      >
        <OrbitControls />
        <Cube ref={cubeRef} />
      </Canvas>
      <div className="btns-container">
        <div className="flex flex-col md:flex-row btns-group">
          <Button className="bg-green" onClick={getOnBtnClick('F')}>
            F
          </Button>
          <Button className="bg-white" onClick={getOnBtnClick('D')}>
            D
          </Button>
          <Button className="bg-red" onClick={getOnBtnClick('R')}>
            R
          </Button>
        </div>
        <div className="flex flex-col md:flex-row btns-group">
          <Button className="bg-blue" onClick={getOnBtnClick('B')}>
            B
          </Button>
          <Button className="bg-yellow" onClick={getOnBtnClick('U')}>
            U
          </Button>
          <Button className="bg-orange" onClick={getOnBtnClick('L')}>
            L
          </Button>
        </div>
      </div>
    </>
  )
}
