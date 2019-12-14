import React from 'react'
import FieldError from '../field-error'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export default React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, name, className = '', error, ...rest } = props

  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name}>
        {label}
        <input
          ref={ref}
          type="text"
          className="h-12 rounded border border-gray-400 outline-none px-4 w-full mt-1 focus:border-gray-500"
          name={name}
          spellCheck={false}
          {...rest}
        />
      </label>
      {error && (
        <div className="mt-1">
          <FieldError>{error}</FieldError>
        </div>
      )}
    </div>
  )
})
