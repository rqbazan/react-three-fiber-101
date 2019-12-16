import React from 'react'
import { ApiClientContext } from 'contexts'
import { ApiClient } from 'types'

let clientInstance: any

interface ApiClientProvider {
  children: React.ReactNode
}

export default function ApiClientProvider({ children }: ApiClientProvider) {
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
    <ApiClientContext.Provider value={client}>
      {children}
    </ApiClientContext.Provider>
  )
}
