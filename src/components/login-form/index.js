import React from 'react'
import Input from '../input'
import Button from '../button'

export default function LoginForm({ className }) {
  return (
    <form className={className}>
      <Input label="Username" />
      <Input label="Password" type="password" className="mt-6" />
      <div className="mt-6 flex justify-end">
        <Button>Log In</Button>
      </div>
    </form>
  )
}
