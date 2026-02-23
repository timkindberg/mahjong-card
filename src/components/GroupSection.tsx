import type { HandGroup } from '../types'
import { HandRow } from './HandRow'
import { toggleFocusGroup, toggleCollapsed, useIsCollapsed } from '../hooks/useCardState'
import { useIsPortrait } from '../hooks/useIsPortrait'

interface Props {
  group: HandGroup
}

const handIdsByGroup = new Map<string, string[]>()

export function GroupSection({ group }: Props) {
  if (!handIdsByGroup.has(group.id)) {
    handIdsByGroup.set(group.id, group.hands.map(h => h.id))
  }
  const handIds = handIdsByGroup.get(group.id)!
  const isPortrait = useIsPortrait()
  const isCollapsed = useIsCollapsed(group.id)

  const headerBase = "bg-stone-200 text-stone-600 py-0.5 font-bold tracking-wide uppercase text-center shrink-0 cursor-pointer border-none"
  const headerSize = isPortrait ? 'text-[11px]' : 'text-[9px]'

  return (
    <div className="flex flex-col" style={isPortrait ? undefined : { flexGrow: group.hands.length }}>
      {isPortrait ? (
        <div className="flex shrink-0">
          <button
            onClick={() => toggleFocusGroup(handIds)}
            className={`${headerBase} ${headerSize} flex-1 px-1.5`}
          >
            {group.name}
          </button>
          <button
            onClick={() => toggleCollapsed(group.id)}
            className={`${headerBase} ${headerSize} px-2 border-l border-stone-300`}
          >
            {isCollapsed ? '▼' : '▲'}
          </button>
        </div>
      ) : (
        <button
          onClick={() => toggleFocusGroup(handIds)}
          className={`${headerBase} ${headerSize} px-1.5 w-full`}
        >
          {group.name}
        </button>
      )}
      {(!isPortrait || !isCollapsed) && (
        <div className="flex flex-col flex-1">
          {group.hands.map(hand => (
            <HandRow key={hand.id} hand={hand} />
          ))}
        </div>
      )}
    </div>
  )
}
