import React from 'react'
import { Canvas } from 'react-three-fiber'
import FirebaseProvider from 'components/firebase-provider'
import Cube from 'components/cube'
import OrbitControls from 'components/orbit-controls'
import CubeControls from 'components/cube-controls'
import AuthButton from 'components/auth-button'
import './index.css'

export default function IndexPage() {
  const cubeRef = React.useRef()

  function onControlClick(faceName, inversed) {
    if (cubeRef.current) {
      cubeRef.current.rotate(faceName, inversed)
    }
  }

  return (
    <FirebaseProvider>
      <div className="flex justify-center">
        <div className="w-full md:max-w-5xl relative">
          <header className="flex absolute w-full p-3 items-center justify-end z-10">
            <AuthButton />
          </header>
          <Canvas className="z-10" camera={{ position: [6, 6, 6] }}>
            <OrbitControls />
            <Cube ref={cubeRef} />
          </Canvas>
          <CubeControls onControlClick={onControlClick} />
        </div>
      </div>
    </FirebaseProvider>
  )
}
