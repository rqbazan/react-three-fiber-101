import React from 'react'

const MoodSad = require('icons/mood-sad.svg').default
const styles = require('./styles.module.css')

interface FieldError {
  children: React.ReactNode
}

export default function FieldError({ children }: FieldError) {
  return (
    <div className="flex rounded bg-red-300 px-3 py-3 items-center text-sm text-red-800">
      <i className={styles.icon}>
        <MoodSad />
      </i>
      {children}
    </div>
  )
}
