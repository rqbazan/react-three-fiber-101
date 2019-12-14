import React from 'react'
import { ApiClient } from 'types'

export const FirebaseContext = React.createContext<ApiClient | undefined>(
  undefined
)
