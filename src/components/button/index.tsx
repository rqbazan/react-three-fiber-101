import React from 'react'
import cs from 'classnames'
import Loader from '../loader'
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
      className={cs(styles.button, className)}
      {...props}
    >
      {!isLoading ? (
        children
      ) : (
        <>
          <span style={{ opacity: 0 }}>{children}</span>
          <span className="absolute flex items-center">
            <Loader />
          </span>
        </>
      )}
    </button>
  )
}
