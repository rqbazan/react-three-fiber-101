import React from 'react'
import useForm from 'react-hook-form'
import FieldError from '../field-error'
import Input from '../input'
import Button from '../button'

export default function LoginForm({ onSubmit }) {
  const { register, errors, handleSubmit, formState, setError } = useForm()

  return (
    <form onSubmit={handleSubmit(formValues => onSubmit(formValues, setError))}>
      <Input
        ref={register({
          required: { value: true, message: 'Enter your email' }
        })}
        error={errors.email && errors.email.message}
        name="email"
        label="Email"
      />
      <Input
        ref={register({
          required: { value: true, message: 'Enter your password' }
        })}
        error={errors.password && errors.password.message}
        name="password"
        label="Password"
        type="password"
        className="mt-6"
      />
      <div className="mt-6 flex justify-end">
        <Button type="submit" isLoading={formState.isSubmitting}>
          Log In
        </Button>
      </div>
      {errors.form && (
        <div className="mt-6">
          <FieldError>{errors.form.message}</FieldError>
        </div>
      )}
    </form>
  )
}
