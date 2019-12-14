import React from 'react'

export default function useScrollBlocker() {
  React.useEffect(() => {
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.overflow = 'auto'
    }
  }, [])
}
