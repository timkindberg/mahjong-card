import { Card } from './components/Card'
import { FullscreenButton } from './components/FullscreenButton'

function App() {
  return (
    <div
      className="h-full w-full flex flex-col"
      style={{
        paddingTop: 'var(--safe-top)',
        paddingRight: 'var(--safe-right)',
        paddingBottom: 'var(--safe-bottom)',
        paddingLeft: 'var(--safe-left)',
      }}
    >
      <Card />
      <FullscreenButton />
    </div>
  )
}

export default App
