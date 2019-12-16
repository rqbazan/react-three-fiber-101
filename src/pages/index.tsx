import './index.css'

import React from 'react'
import { FaceName } from 'types'
import { Canvas } from 'react-three-fiber'
import ApiClientProvider from 'components/api-client-provider'
import Cube, { CubeRef } from 'components/cube'
import OrbitControls from 'components/orbit-controls'
import CubeControls from 'components/cube-controls'
import AuthButton from 'components/auth-button'
import useScrollBlocker from 'hooks/use-scroll-blocker'

export default function IndexPage() {
  const cubeRef = React.useRef<CubeRef>(null!)

  useScrollBlocker()

  function onControlClick(faceName: FaceName, inversed: boolean) {
    if (cubeRef.current) {
      cubeRef.current.rotate(faceName, inversed)
    }
  }

  return (
    <ApiClientProvider>
      <div className="flex justify-center">
        <div className="w-full md:max-w-5xl relative">
          <header className="flex absolute w-full p-3 items-center justify-end z-10">
            <AuthButton />
          </header>
          <Canvas camera={{ position: [6, 6, 6] }}>
            <OrbitControls />
            <Cube ref={cubeRef} />
          </Canvas>
          <CubeControls onControlClick={onControlClick} />
        </div>
      </div>
    </ApiClientProvider>
  )
}
