import React from 'react'
import { User } from 'types'
import useApiClient from './use-api-client'

interface AuthState {
  user: User | null
  isLogged: boolean
  logOut(): void
}

export default function useAuth() {
  const [auth, setAuth] = React.useState<AuthState>()
  const apliClient = useApiClient()

  React.useEffect(() => {
    if (apliClient) {
      apliClient.onAuth(user => {
        setAuth({ user, isLogged: !!user, logOut: () => apliClient.logOut() })
      })
    }
  }, [apliClient])

  return auth
}
