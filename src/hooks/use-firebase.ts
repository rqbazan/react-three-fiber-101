import React from 'react'
import { FirebaseContext } from 'contexts'

export default function useFirebase() {
  return React.useContext(FirebaseContext)
}
