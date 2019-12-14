import React from 'react'
import { FirebaseContext } from 'contexts'
import { ApiClient } from 'types'

let clientInstance: any

interface FirebaseProvider {
  children: React.ReactNode
}

export default function FirebaseProvider({ children }: FirebaseProvider) {
  const [client, setClient] = React.useState<ApiClient>()

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
