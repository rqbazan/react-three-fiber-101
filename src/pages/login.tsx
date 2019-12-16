import React from 'react'
import { navigate } from 'gatsby'
import Modal from 'components/modal'
import LoginForm, { LoginFormValues, SetError } from 'components/login-form'
import ApiClientProvider from 'components/api-client-provider'
import useApiClient from 'hooks/use-api-client'

// TODO: add loading state for api client loading

function LoginModal() {
  const apliClient = useApiClient()

  async function onSubmit(formValues: LoginFormValues, setError: SetError) {
    try {
      if (!apliClient) {
        return
      }

      const { email, password } = formValues
      await apliClient.logIn(email, password)
      navigate('/', { replace: true })
    } catch (error) {
      console.error('[LoginModal]', error)
      if (error.code === 'auth/wrong-password') {
        setError('password', 'wrong', error.message)
      } else if (error.code === 'auth/invalid-email') {
        setError('email', 'invalid', error.message)
      } else {
        setError('form', 'unknown', error.message)
      }
    }
  }

  return (
    <Modal onClose={() => navigate('/')}>
      <LoginForm onSubmit={onSubmit} />
    </Modal>
  )
}

export default function LoginPage() {
  return (
    <ApiClientProvider>
      <LoginModal />
    </ApiClientProvider>
  )
}
