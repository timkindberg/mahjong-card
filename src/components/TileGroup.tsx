import type { TileGroup } from '../types'
import { useIsCompleted, toggleComplete } from '../hooks/useCardState'
import { useIsPortrait } from '../hooks/useIsPortrait'

interface Props {
  group: TileGroup
}

const colorMap: Record<string, string> = {
  red: 'text-red-700',
  green: 'text-green-700',
  blue: 'text-blue-700',
}

export function TileGroupDisplay({ group }: Props) {
  const isCompleted = useIsCompleted(group.id)
  const isPortrait = useIsPortrait()
  const fontSize = isPortrait ? 'text-[13px]' : 'text-[11px]'

  if (group.tileType === 'operator') {
    const isSymbol = group.display === '+' || group.display === '='
    return (
      <span className={`${fontSize} text-stone-400 leading-none inline-block text-center ${isSymbol ? 'w-[8px] font-bold' : 'w-[3px]'}`}>
        {isSymbol ? group.display : '\u00A0'}
      </span>
    )
  }

  const colorClass = group.suitColor ? colorMap[group.suitColor] : ''
  const typeClass = group.tileType === 'flower'
    ? 'text-pink-500'
    : group.tileType === 'wind'
    ? 'text-stone-800'
    : group.tileType === 'dragon'
    ? (group.suitColor ? colorMap[group.suitColor] : 'text-stone-800')
    : colorClass

  return (
    <button
      onClick={() => toggleComplete(group.id)}
      className={`${fontSize} font-bold leading-none px-0 py-[1px] cursor-pointer border-none bg-transparent rounded-sm ${typeClass} ${
        isCompleted ? 'bg-yellow-300 ring-1 ring-yellow-500' : ''
      }`}
    >
      {group.display}
    </button>
  )
}
