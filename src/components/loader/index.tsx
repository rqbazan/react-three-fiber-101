import React from 'react'
import styles from './styles.module.css'

interface LoaderProps {
  size?: 16 | 24 | 32
  strokeWidth?: 2 | 3 | 4
  dark?: boolean
}

export default function Loader({
  size = 16,
  strokeWidth = 3,
  dark = false
}: LoaderProps) {
  const radius = (size - strokeWidth) / 2
  const offset = Math.round(Math.PI * 2 * radius)

  const t = strokeWidth / 2
  const transform = `translate(${t}px, ${t}px)`

  return (
    <svg height={size} width={size} className={styles.loader}>
      <style>{`circle { --offset: ${offset}px; }`}</style>
      <circle
        className={styles.circle}
        cx={radius}
        cy={radius}
        r={radius}
        stroke={dark ? '#000' : '#fff'}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={offset}
        strokeDashoffset={offset}
        style={{ transform }}
      />
    </svg>
  )
}
