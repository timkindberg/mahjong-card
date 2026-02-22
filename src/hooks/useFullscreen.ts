import { useState, useCallback, useEffect } from 'react'

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const isPWA = window.matchMedia('(display-mode: standalone)').matches
    || (navigator as any).standalone === true

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  const toggle = useCallback(async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
    } else {
      await document.documentElement.requestFullscreen()
    }
  }, [])

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

  return { isFullscreen: isFullscreen || isPWA, toggle, isPWA, isIOS }
}
