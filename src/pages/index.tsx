import React from 'react'
import { FaceName } from 'types'
import { Canvas } from 'react-three-fiber'
import ApiClientProvider from 'components/api-client-provider'
import Cube, { CubeRef } from 'components/cube'
import OrbitControls from 'components/orbit-controls'
import CubeControls from 'components/cube-controls'
import AuthButton from 'components/auth-button'
import useAuth from 'hooks/use-auth'
import Icon from 'components/icon'
import useScrollBlocker from 'hooks/use-scroll-blocker'
import './index.css' // important keep this line here at the bottom

interface HeaderProps {
  onScrambleClick: () => void
}

function Header({ onScrambleClick }: HeaderProps) {
  const auth = useAuth()

  return (
    <header className="flex absolute w-full p-3 items-center justify-end z-10">
      <div className="text-gray-900 bg-white rounded-xl h-8 flex items-center px-6 shadow-lg mr-4">
        <Icon name="duplicate" role="button" onClick={onScrambleClick} />
        {auth?.isLogged && (
          <>
            <Icon name="cloud-upload" className="ml-4" role="button" />
            <Icon name="configuration" className="ml-4" role="button" />
          </>
        )}
      </div>
      <AuthButton auth={auth} />
    </header>
  )
}

export default function IndexPage() {
  const cubeRef = React.useRef<CubeRef>(null!)

  useScrollBlocker()

  function onControlClick(faceName: FaceName, inversed: boolean) {
    if (cubeRef.current) {
      cubeRef.current.rotateFace(faceName, inversed)
    }
  }

  function onScrambleClick() {
    if (cubeRef.current) {
      cubeRef.current.scrambleFaces()
    }
  }

  return (
    <ApiClientProvider>
      <div className="flex justify-center">
        <div className="w-full md:max-w-5xl relative">
          <Header onScrambleClick={onScrambleClick} />
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
