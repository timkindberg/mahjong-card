import type { HandGroup } from '../types'
import { HandRow } from './HandRow'
import { toggleFocusGroup } from '../hooks/useCardState'

interface Props {
  group: HandGroup
}

const headerColors: Record<string, string> = {
  '2025': 'bg-amber-600 text-white',
  '2468': 'bg-emerald-700 text-white',
  'any-like-numbers': 'bg-sky-700 text-white',
  'quints': 'bg-purple-700 text-white',
  'consecutive-run': 'bg-rose-700 text-white',
  '13579': 'bg-orange-700 text-white',
  'winds-dragons': 'bg-teal-700 text-white',
  '369': 'bg-indigo-700 text-white',
  'singles-pairs': 'bg-pink-700 text-white',
}

const handIdsByGroup = new Map<string, string[]>()

export function GroupSection({ group }: Props) {
  const colorClass = headerColors[group.id] || 'bg-gray-600 text-white'

  if (!handIdsByGroup.has(group.id)) {
    handIdsByGroup.set(group.id, group.hands.map(h => h.id))
  }
  const handIds = handIdsByGroup.get(group.id)!

  return (
    <div className="flex flex-col" style={{ flexGrow: group.hands.length }}>
      <button
        onClick={() => toggleFocusGroup(handIds)}
        className={`${colorClass} px-1.5 py-0.5 text-[8px] font-bold tracking-wide uppercase text-center shrink-0 cursor-pointer border-none w-full`}
      >
        {group.name}
      </button>
      <div className="flex flex-col flex-1">
        {group.hands.map(hand => (
          <HandRow key={hand.id} hand={hand} />
        ))}
      </div>
    </div>
  )
}
