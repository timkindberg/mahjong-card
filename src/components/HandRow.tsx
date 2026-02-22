import type { Hand } from '../types'
import { TileGroupDisplay } from './TileGroup'
import { useIsFocused, useIsDimmed, toggleFocus } from '../hooks/useCardState'

interface Props {
  hand: Hand
}

export function HandRow({ hand }: Props) {
  const isFocused = useIsFocused(hand.id)
  const isDimmed = useIsDimmed(hand.id)

  return (
    <div
      className={`flex items-center px-1 border-b border-stone-200 flex-1 ${
        isFocused ? 'bg-yellow-100' : ''
      }`}
      style={{
        opacity: isDimmed ? 0.3 : 1,
      }}
    >
      {/* Hand number - tappable for focus */}
      <button
        onClick={() => toggleFocus(hand.id)}
        className="text-[8px] font-bold text-stone-700 w-[16px] shrink-0 text-left leading-none cursor-pointer bg-transparent border-none p-0"
      >
        {hand.number}
      </button>

      {/* Tile groups */}
      <div className="flex items-center gap-0 flex-1 min-w-0 leading-none">
        {hand.tileGroups.map(tg => (
          <TileGroupDisplay key={tg.id} group={tg} />
        ))}
      </div>

      {/* Description */}
      {hand.description && (
        <span className="text-[6px] text-stone-500 italic ml-0.5 leading-none shrink overflow-hidden whitespace-nowrap text-ellipsis min-w-[30px]">
          {hand.description}
        </span>
      )}

      {/* Concealed / Exposed + Points */}
      <span className="text-[7px] font-bold text-stone-600 w-[10px] text-center shrink-0 leading-none">
        {hand.concealed ? 'C' : 'X'}
      </span>
      <span className="text-[7px] font-semibold text-stone-700 w-[14px] text-right shrink-0 leading-none">
        {hand.points}
      </span>
    </div>
  )
}
