import React from 'react'
import cs from 'classnames'
import Button, { ButtonProps } from '../button'

interface ControlButtonProps extends ButtonProps {
  color?: string
}

export default function ControlButton({
  color,
  className,
  ...props
}: ControlButtonProps) {
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
