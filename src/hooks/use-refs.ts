import React from 'react'

export default function useRefs<T>(capacity: number) {
  return Array.from({ length: capacity }).map(() => React.useRef<T>())
}
