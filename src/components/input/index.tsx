import React from 'react'
import cs from 'classnames'
import FieldError from '../field-error'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export default React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, name, error, className, ...props }: InputProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div className={cs('flex flex-col', className)}>
        <label htmlFor={name}>
          {label}
          <input
            ref={ref}
            type="text"
            className="h-12 rounded border border-gray-400 outline-none px-4 w-full mt-1 focus:border-gray-500"
            name={name}
            spellCheck={false}
            {...props}
          />
        </label>
        {error && (
          <div className="mt-1">
            <FieldError>{error}</FieldError>
          </div>
        )}
      </div>
    )
  }
)
