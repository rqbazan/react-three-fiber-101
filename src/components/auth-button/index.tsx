import React from 'react'
import { Link } from 'gatsby'
import { AuthState } from '~/hooks/use-auth'
import Button from '../button'

interface AuthButtonProps {
  auth?: AuthState
}

export default function AuthButton({ auth }: AuthButtonProps) {
  if (!auth) {
    return <Button isLoading />
  }

  const { isLogged, logOut } = auth

  if (isLogged) {
    return <Button onClick={logOut}>Log Out</Button>
  }

  return (
    <Link to="/login">
      <Button>Log In</Button>
    </Link>
  )
}
