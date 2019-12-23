import React from 'react'
import { NotifierPortal } from 'zeit-toast-clone'
import 'zeit-toast-clone/styles.css'

export const wrapRootElement = ({ element }) => {
  return (
    <>
      {element}
      <NotifierPortal />
    </>
  )
}
