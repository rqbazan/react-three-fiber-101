import React from 'react'
import useFirebase from './use-firebase'

export default function useAuth() {
  const [auth, setAuth] = React.useState()
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
