import React from 'react'
import { navigate } from 'gatsby'
import Modal from 'components/modal'
import LoginForm from 'components/login-form'
import FirebaseProvider from 'components/firebase-provider'
import useFirebase from 'hooks/use-firebase'

function LoginModal() {
  const firebase = useFirebase()

  async function onSubmit(formValues, setError) {
    try {
      const { email, password } = formValues
      await firebase.logIn(email, password)
    } catch (error) {
      console.error('[LoginModal]', error)
      if (error.code === 'auth/wrong-password') {
        setError('password', null, error.message)
      } else if (error.code === 'auth/invalid-email') {
        setError('email', null, error.message)
      } else {
        setError('form', null, error.message)
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
