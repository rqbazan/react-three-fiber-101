import React from 'react'
import { navigate } from 'gatsby'
import Modal from 'components/modal'
import LoginForm from 'components/login-form'

export default function LoginPage() {
  function onSubmit(data) {
    alert(JSON.stringify(data, null, 2))
  }

  return (
    <Modal onClose={() => navigate('/')}>
      <LoginForm onSubmit={onSubmit} />
    </Modal>
  )
}
