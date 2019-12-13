import React from 'react'
import { FirebaseContext } from 'contexts'

let clientInstance

export default function FirebaseProvider({ children }) {
  const [client, setClient] = React.useState()

  React.useEffect(() => {
    import('firebase-client').then(({ default: FirebaseClient }) => {
      if (!clientInstance) {
        clientInstance = new FirebaseClient()
      }
      setClient(clientInstance)
    })
  }, [])

  return (
    <FirebaseContext.Provider value={client}>
      {children}
    </FirebaseContext.Provider>
  )
}
