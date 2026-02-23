import { handGroups } from '../data/hands'
import { CardColumn } from './CardColumn'
import { useIsPortrait } from '../hooks/useIsPortrait'

const portraitOrder = [
  '2025',
  '2468',
  '13579',
  '369',
  'consecutive-run',
  'any-like-numbers',
  'quints',
  'winds-dragons',
  'singles-pairs',
]

const groupById = new Map(handGroups.map(g => [g.id, g]))

export function Card() {
  const isPortrait = useIsPortrait()

  if (isPortrait) {
    const ordered = portraitOrder.map(id => groupById.get(id)!)
    return (
      <div className="flex-1 overflow-y-auto bg-stone-50">
        {ordered.map(group => (
          <CardColumn key={group.id} groups={[group]} />
        ))}
      </div>
    )
  }

  const col1 = handGroups.filter(g => g.column === 1)
  const col2 = handGroups.filter(g => g.column === 2)
  const col3 = handGroups.filter(g => g.column === 3)

  return (
    <div className="flex-1 flex min-h-0 gap-px bg-stone-300">
      <CardColumn groups={col1} />
      <CardColumn groups={col2} />
      <CardColumn groups={col3} />
    </div>
  )
}
