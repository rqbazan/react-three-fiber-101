import React from 'react'

export default function Input({ label, name, className = '', ...props }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name}>
        {label}
        <input
          type="text"
          className="h-12 rounded border border-gray-400 outline-none px-4 w-full mt-1"
          name={name}
          spellCheck={false}
          {...props}
        />
      </label>
    </div>
  )
}
