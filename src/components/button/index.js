import React from 'react'
import styles from './styles.module.css'

export default function Button({ className = '', ...props }) {
  return (
    <button
      type="button"
      className={`${styles.button} ${className}`}
      {...props}
    />
  )
}
