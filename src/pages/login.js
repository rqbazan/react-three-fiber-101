import React from 'react'
import { navigate } from 'gatsby'
import Modal from 'components/modal'
import LoginForm from 'components/login-form'

export default function LoginPage() {
  return (
    <Modal onClose={() => navigate('/')}>
      <LoginForm />
    </Modal>
  )
}
