import React from 'react'
import { User } from 'types'
import useFirebase from './use-firebase'

interface AuthState {
  user: User | null
  isLogged: boolean
  logOut(): void
}

export default function useAuth() {
  const [auth, setAuth] = React.useState<AuthState>()
  const firebase = useFirebase()

  React.useEffect(() => {
    if (firebase) {
      firebase.onAuth(user => {
        setAuth({ user, isLogged: !!user, logOut: () => firebase.logOut() })
      })
    }
  }, [firebase])

  return auth
}
