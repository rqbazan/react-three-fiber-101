import React from 'react'
import { FirebaseContext } from 'contexts'

export default function FirebaseProvider({ children }) {
  const [client, setClient] = React.useState()

  React.useEffect(() => {
    import('firebase-client').then(({ default: FirebaseClient }) => {
      setClient(new FirebaseClient())
    })
  }, [])

  return (
    <FirebaseContext.Provider value={client}>
      {children}
    </FirebaseContext.Provider>
  )
}
