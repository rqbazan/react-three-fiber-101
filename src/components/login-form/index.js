import React from 'react'
import useForm from 'react-hook-form'
import Input from '../input'
import Button from '../button'

export default function LoginForm({ onSubmit, className }) {
  const { register, errors, handleSubmit } = useForm()

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <Input
        ref={register({
          required: { value: true, message: 'Enter your username' }
        })}
        error={errors.username && errors.username.message}
        name="username"
        label="Username"
      />
      <Input
        ref={register({
          required: { value: true, message: 'Really? just enter the password' }
        })}
        error={errors.password && errors.password.message}
        name="password"
        label="Password"
        type="password"
        className="mt-6"
      />
      <div className="mt-6 flex justify-end">
        <Button type="submit">Log In</Button>
      </div>
    </form>
  )
}
