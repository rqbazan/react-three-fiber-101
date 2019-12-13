import React from 'react'
import { Link } from 'gatsby'
import { Canvas } from 'react-three-fiber'
import FirebaseProvider from 'components/firebase-provider'
import Cube from 'components/cube'
import OrbitControls from 'components/orbit-controls'
import CubeControls from 'components/cube-controls'
import Button from 'components/button'
import useAuth from 'hooks/use-auth'
import './index.css'

function AuthButton() {
  const auth = useAuth()

  if (!auth) {
    return <Button isLoading />
  }

  const { isLogged, logOut } = auth

  if (isLogged) {
    return <Button onClick={logOut}>Log Out</Button>
  }

  return (
    <Link to="/login">
      <Button>Log In</Button>
    </Link>
  )
}

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
          <Canvas camera={{ position: [6, 6, 6] }}>
            <OrbitControls />
            <Cube ref={cubeRef} />
          </Canvas>
          <CubeControls onControlClick={onControlClick} />
        </div>
      </div>
    </FirebaseProvider>
  )
}
