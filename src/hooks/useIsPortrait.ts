import { useSyncExternalStore } from 'react'

const query = typeof window !== 'undefined'
  ? window.matchMedia('(orientation: portrait)')
  : null

function subscribe(cb: () => void) {
  query?.addEventListener('change', cb)
  return () => query?.removeEventListener('change', cb)
}

function getSnapshot() {
  return query?.matches ?? false
}

export function useIsPortrait() {
  return useSyncExternalStore(subscribe, getSnapshot)
}
