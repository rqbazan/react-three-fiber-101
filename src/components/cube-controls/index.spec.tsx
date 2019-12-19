import React from 'react'
import noop from 'lodash.noop'
import { render, fireEvent } from '@testing-library/react'
import CubeControls from './index'

it('updates controls when a slice controls in clicked', async () => {
  const { container, findByText } = render(
    <CubeControls preferLetters onControlClick={noop} />
  )

  fireEvent.click(await findByText('M'))
  fireEvent.click(await findByText('S'))
  fireEvent.click(await findByText('E'))

  expect(container).toMatchSnapshot()
})
