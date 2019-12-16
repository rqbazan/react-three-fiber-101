import React from 'react'
import Icon from '../icon'
import styles from './styles.module.css'

interface FieldError {
  children: React.ReactNode
}

export default function FieldError({ children }: FieldError) {
  return (
    <div className="flex rounded bg-red-300 px-3 py-3 items-center text-sm text-red-800">
      <i className={styles.icon}>
        <Icon name="mood-sad" />
      </i>
      {children}
    </div>
  )
}
