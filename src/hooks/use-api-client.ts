import React from 'react'
import { ApiClientContext } from 'contexts'

export default function useApiClient() {
  return React.useContext(ApiClientContext)
}
