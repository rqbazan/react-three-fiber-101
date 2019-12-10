import React from 'react'
import Box from './box'

function useKeyboard(keyHandlers) {
  React.useEffect(() => {
    const listener = e => {
      const handler = keyHandlers[e.code]
      if (handler) {
        handler()
      }
    }

    document.addEventListener('keydown', listener)

    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [])
}

export default function Cube() {
  useKeyboard({
    KeyU: () => {},
    KeyD: () => {},
    KeyR: () => {},
    KeyL: () => {},
    KeyF: () => {},
    KeyB: () => {}
  })

  return (
    <>
      <Box
        position={[-1, 1, 1]}
        upColor="yellow"
        leftColor="red"
        frontColor="green"
      />
      <Box position={[0, 1, 1]} upColor="yellow" frontColor="green" />
      <Box
        position={[1, 1, 1]}
        upColor="yellow"
        rightColor="orange"
        frontColor="green"
      />

      <Box position={[-1, 0, 1]} frontColor="green" leftColor="red" />
      <Box position={[0, 0, 1]} frontColor="green" />
      <Box position={[1, 0, 1]} frontColor="green" rightColor="orange" />

      <Box
        position={[-1, -1, 1]}
        leftColor="red"
        frontColor="green"
        downColor="white"
      />
      <Box position={[0, -1, 1]} frontColor="green" downColor="white" />
      <Box
        position={[1, -1, 1]}
        rightColor="orange"
        frontColor="green"
        downColor="white"
      />

      <Box position={[-1, 1, 0]} upColor="yellow" leftColor="red" />
      <Box position={[0, 1, 0]} upColor="yellow" />
      <Box position={[1, 1, 0]} upColor="yellow" rightColor="orange" />

      <Box position={[-1, 0, 0]} leftColor="red" />
      <Box position={[1, 0, 0]} rightColor="orange" />

      <Box position={[-1, -1, 0]} leftColor="red" downColor="white" />
      <Box position={[0, -1, 0]} downColor="white" />
      <Box position={[1, -1, 0]} rightColor="orange" downColor="white" />

      <Box
        position={[-1, 1, -1]}
        backColor="blue"
        upColor="yellow"
        leftColor="red"
      />
      <Box position={[0, 1, -1]} backColor="blue" upColor="yellow" />
      <Box
        position={[1, 1, -1]}
        backColor="blue"
        upColor="yellow"
        rightColor="orange"
      />

      <Box position={[-1, 0, -1]} backColor="blue" leftColor="red" />
      <Box position={[0, 0, -1]} backColor="blue" />
      <Box position={[1, 0, -1]} backColor="blue" rightColor="orange" />

      <Box
        position={[-1, -1, -1]}
        leftColor="red"
        backColor="blue"
        downColor="white"
      />
      <Box position={[0, -1, -1]} backColor="blue" downColor="white" />
      <Box
        position={[1, -1, -1]}
        rightColor="orange"
        backColor="blue"
        downColor="white"
      />
    </>
  )
}
