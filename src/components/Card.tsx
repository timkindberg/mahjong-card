import { handGroups } from '../data/hands'
import { CardColumn } from './CardColumn'

export function Card() {
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
