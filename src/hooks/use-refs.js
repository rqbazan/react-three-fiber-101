import React from 'react'

export default function useRefs(capacity) {
  return Array.from({ length: capacity }).map(() => React.useRef())
}
