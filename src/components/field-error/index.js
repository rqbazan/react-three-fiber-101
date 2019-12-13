import React from 'react'
import MoodSad from 'icons/mood-sad.svg'
import styles from './styles.module.css'

export default function FieldError({ children }) {
  return (
    <div className="flex rounded bg-red-300 px-3 py-3 items-center text-sm text-red-800">
      <i className="h-6 w-6 mr-1">
        <MoodSad className={styles.icon} />
      </i>
      {children}
    </div>
  )
}
