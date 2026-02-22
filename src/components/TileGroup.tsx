import type { TileGroup } from '../types'
import { useIsCompleted, toggleComplete } from '../hooks/useCardState'

interface Props {
  group: TileGroup
}

const colorMap: Record<string, string> = {
  red: 'text-red-600',
  green: 'text-green-600',
  blue: 'text-blue-600',
}

export function TileGroupDisplay({ group }: Props) {
  const isCompleted = useIsCompleted(group.id)

  if (group.tileType === 'operator') {
    return (
      <span className="text-[8px] text-stone-400 leading-none w-[4px] inline-block text-center">
        {'\u00A0'}
      </span>
    )
  }

  const colorClass = group.suitColor ? colorMap[group.suitColor] : ''
  const typeClass = group.tileType === 'flower'
    ? 'text-purple-600'
    : group.tileType === 'wind'
    ? 'text-stone-800'
    : group.tileType === 'dragon'
    ? (group.suitColor ? colorMap[group.suitColor] : 'text-stone-800')
    : colorClass

  return (
    <button
      onClick={() => toggleComplete(group.id)}
      className={`text-[8px] font-bold leading-none px-[1px] py-[1px] cursor-pointer border-none bg-transparent rounded-sm ${typeClass} ${
        isCompleted ? 'bg-yellow-300 ring-1 ring-yellow-500' : ''
      }`}
    >
      {group.display}
    </button>
  )
}
