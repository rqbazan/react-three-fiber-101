import React from 'react'
import styles from './styles.module.css'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export default function Button({
  className = '',
  isLoading,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      data-loading={isLoading}
      className={`${styles.button} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {isLoading && (
        <span className="absolute text-white h-full top-0">...</span>
      )}
    </button>
  )
}
