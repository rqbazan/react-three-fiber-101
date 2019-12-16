import React from 'react'
import { User } from 'types'
import useApiClient from './use-api-client'

export interface AuthState {
  user: User | null
  isLogged: boolean
  logOut(): void
}

export default function useAuth() {
  const [auth, setAuth] = React.useState<AuthState>()
  const apliClient = useApiClient()

  React.useEffect(() => {
    let unsubscribe: () => void

    if (apliClient) {
      unsubscribe = apliClient.onAuth(user => {
        setAuth({ user, isLogged: !!user, logOut: () => apliClient.logOut() })
      })
    }

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [apliClient])

  return auth
}
