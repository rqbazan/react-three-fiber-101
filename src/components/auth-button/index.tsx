import React from 'react'
import { Link } from 'gatsby'
import useAuth from 'hooks/use-auth'
import Button from '../button'

export default function AuthButton() {
  const auth = useAuth()

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
