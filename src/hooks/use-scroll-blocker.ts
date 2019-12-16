import React from 'react'

export default function useScrollBlocker() {
  React.useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.overflow = 'auto'
    }
  }, [])
}
