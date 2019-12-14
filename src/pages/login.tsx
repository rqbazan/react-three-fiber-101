import React from 'react'
import { navigate } from 'gatsby'
import Modal from 'components/modal'
import LoginForm, { LoginFormValues, SetError } from 'components/login-form'
import FirebaseProvider from 'components/firebase-provider'
import useFirebase from 'hooks/use-firebase'

// TODO: add loading state for firebase loading

function LoginModal() {
  const firebase = useFirebase()

  async function onSubmit(formValues: LoginFormValues, setError: SetError) {
    try {
      if (!firebase) {
        return
      }

      const { email, password } = formValues
      await firebase.logIn(email, password)
      navigate('/')
    } catch (error) {
      console.error('[LoginModal]', error)
      if (error.code === 'auth/wrong-password') {
        setError('password', 'wrong', error.message)
      } else if (error.code === 'auth/invalid-email') {
        setError('email', 'invalid', error.message)
      } else {
        setError('form', 'unknow', error.message)
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
    <FirebaseProvider>
      <LoginModal />
    </FirebaseProvider>
  )
}
