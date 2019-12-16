import React from 'react'
import Button, { ButtonProps } from '../button'

interface ControlProps extends ButtonProps {
  color?: string
}

export default function Control({ color, ...props }: ControlProps) {
  const className = color ? `bg-pegatine-${color}` : 'text-white'

  return (
    <Button
      className={`rounded-full border-solid border-2 border-black h-10 w-10 p-0 text-black ${className}`}
      {...props}
    />
  )
}
