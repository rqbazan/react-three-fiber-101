import React from 'react'
import Button from '../button'

export default function RoundedButton({ className = '', ...props }) {
  return (
    <Button
      type="button"
      className={`rounded-full h-10 w-10 p-0 text-black ${className}`}
      {...props}
    />
  )
}
