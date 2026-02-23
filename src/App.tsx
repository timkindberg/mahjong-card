import { Card } from './components/Card'
import { FullscreenButton } from './components/FullscreenButton'
import { useIsPortrait } from './hooks/useIsPortrait'

function App() {
  const isPortrait = useIsPortrait()

  return (
    <div
      className="h-full w-full flex flex-col"
      style={isPortrait ? {
        paddingTop: 'var(--safe-top)',
      } : {
        paddingLeft: 'var(--safe-left)',
      }}
    >
      <Card />
      <FullscreenButton />
    </div>
  )
}

export default App
