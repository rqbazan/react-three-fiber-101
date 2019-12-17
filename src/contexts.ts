import React from 'react'
import { ApiClient } from '~/types'

export const ApiClientContext = React.createContext<ApiClient | undefined>(
  undefined
)
