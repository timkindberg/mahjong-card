import { useSyncExternalStore } from 'react'

// --- Module-level store ---

let focusedHands = loadSet('mj-focused')
let completedGroups = loadSet('mj-completed')
let listeners: (() => void)[] = []

function loadSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return new Set(JSON.parse(raw))
  } catch {}
  return new Set()
}

function saveSet(key: string, set: Set<string>) {
  localStorage.setItem(key, JSON.stringify([...set]))
}

function emit() {
  for (const l of listeners) l()
}

function subscribe(cb: () => void) {
  listeners.push(cb)
  return () => {
    listeners = listeners.filter(l => l !== cb)
  }
}

export function toggleFocus(id: string) {
  const next = new Set(focusedHands)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  focusedHands = next
  saveSet('mj-focused', next)
  emit()
}

export function toggleFocusGroup(handIds: string[]) {
  const next = new Set(focusedHands)
  const allFocused = handIds.every(id => next.has(id))
  if (allFocused) {
    handIds.forEach(id => next.delete(id))
  } else {
    handIds.forEach(id => next.add(id))
  }
  focusedHands = next
  saveSet('mj-focused', next)
  emit()
}

export function toggleComplete(id: string) {
  const next = new Set(completedGroups)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  completedGroups = next
  saveSet('mj-completed', next)
  emit()
}

// --- Hooks: each returns a primitive, so components only re-render when their value changes ---

export function useIsFocused(id: string) {
  return useSyncExternalStore(subscribe, () => focusedHands.has(id))
}

export function useIsCompleted(id: string) {
  return useSyncExternalStore(subscribe, () => completedGroups.has(id))
}
