import React from 'react'
import './style.css'

export default function RoundedButton({ className, ...props }) {
  return <button type="button" className={`button ${className}`} {...props} />
}
