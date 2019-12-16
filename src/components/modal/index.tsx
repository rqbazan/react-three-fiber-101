import React from 'react'
import Icon from '../icon'

interface ModalProps {
  children: React.ReactNode
  onClose(): void
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div className="md:flex md:justify-center md:items-center md:h-screen">
      <div className="p-8 bg-gray-100 h-screen md:w-full md:max-w-sm md:border md:border-gray-400 md:h-auto md:shadow-lg md:rounded">
        <div className="flex justify-end">
          <Icon
            name="close"
            role="button"
            tabIndex={0}
            className="h-8 w-8 cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="mt-8 md:mt-0">{children}</div>
      </div>
    </div>
  )
}
