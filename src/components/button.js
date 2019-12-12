import React from 'react'

export default function Button({ className, ...props }) {
  return (
    <button
      type="button"
      className={`font-bold text-lg rounded-full h-12 w-12 border-solid border-4 border-black focus:outline-none ${className}`}
      {...props}
    />
  )
}
