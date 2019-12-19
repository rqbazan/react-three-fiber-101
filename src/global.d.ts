/// <reference types="@testing-library/jest-dom" />

// https://github.com/react-spring/react-three-fiber/pull/59#issuecomment-487175233
declare namespace JSX {
  interface IntrinsicElements {
    orbitControls: any
  }
}

declare module '*.module.css'
declare module '*.svg'
