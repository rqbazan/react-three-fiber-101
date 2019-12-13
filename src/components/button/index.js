import React from 'react'
import './style.css'

export default function Button({ className = '', ...props }) {
  return <button type="button" className={`button ${className}`} {...props} />
}
