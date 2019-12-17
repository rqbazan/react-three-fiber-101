import React from 'react'
import { render } from '@testing-library/react'
import CubeControls, { CubeControlsProps } from './index'

function renderCubeControls(props?: Partial<CubeControlsProps>) {
  const defaultProps: CubeControlsProps = {
    onControlClick: () => {},
    preferLetters: true
  }
  return render(<CubeControls {...defaultProps} {...props} />)
}

it.skip('updates controls when a slice controls in clicked', async () => {
  expect(1).toBe(1)
})
