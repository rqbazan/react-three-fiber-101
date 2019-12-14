import React from 'react'
import Button, { ButtonProps } from '../button'

export default function RoundedButton({
  className = '',
  ...props
}: ButtonProps) {
  return (
    <Button
      type="button"
      className={`rounded-full border-solid border-4 border-black h-10 w-10 p-0 text-black ${className}`}
      {...props}
    />
  )
}
