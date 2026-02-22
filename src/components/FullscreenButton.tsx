import { useFullscreen } from '../hooks/useFullscreen'

export function FullscreenButton() {
  const { isFullscreen, toggle, isPWA, isIOS } = useFullscreen()

  // Don't show if already in PWA mode
  if (isPWA) return null

  // On iOS, show "Add to Home Screen" hint instead
  if (isIOS) {
    return (
      <div className="absolute bottom-1 right-2 text-[7px] text-stone-400">
        Add to Home Screen for fullscreen
      </div>
    )
  }

  return (
    <button
      onClick={toggle}
      className="absolute bottom-1 right-2 text-[8px] bg-stone-700 text-white px-1.5 py-0.5 rounded cursor-pointer border-none opacity-60 hover:opacity-100"
    >
      {isFullscreen ? 'Exit FS' : 'Fullscreen'}
    </button>
  )
}
