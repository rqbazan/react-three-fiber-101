import React from 'react'
import cs from 'classnames'
import Button, { ButtonProps } from '../button'

interface ControlProps extends ButtonProps {
  color?: string
}

export default function Control({ color, className, ...props }: ControlProps) {
  return (
    <Button
      className={cs(
        'rounded-full border-solid border-3 border-black h-10 w-10 p-0',
        { [`bg-pegatine-${color}`]: !!color },
        className
      )}
      {...props}
    />
  )
}
