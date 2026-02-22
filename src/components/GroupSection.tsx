import type { HandGroup } from '../types'
import { HandRow } from './HandRow'
import { toggleFocusGroup } from '../hooks/useCardState'

interface Props {
  group: HandGroup
}

const handIdsByGroup = new Map<string, string[]>()

export function GroupSection({ group }: Props) {
  if (!handIdsByGroup.has(group.id)) {
    handIdsByGroup.set(group.id, group.hands.map(h => h.id))
  }
  const handIds = handIdsByGroup.get(group.id)!

  return (
    <div className="flex flex-col" style={{ flexGrow: group.hands.length }}>
      <button
        onClick={() => toggleFocusGroup(handIds)}
        className="bg-stone-200 text-stone-600 px-1.5 py-0.5 text-[9px] font-bold tracking-wide uppercase text-center shrink-0 cursor-pointer border-none w-full"
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
