import type { Hand } from '../types'
import { TileGroupDisplay } from './TileGroup'
import { useIsFocused, toggleFocus } from '../hooks/useCardState'

interface Props {
  hand: Hand
}

export function HandRow({ hand }: Props) {
  const isFocused = useIsFocused(hand.id)

  return (
    <div
      className={`flex items-center px-1 border-b border-stone-200 flex-1 cursor-pointer ${
        isFocused ? 'bg-yellow-200' : ''
      }`}
      onClick={() => toggleFocus(hand.id)}
    >
      {/* Tile groups - stop propagation so row toggle doesn't fire */}
      <div
        className="flex items-center gap-0 shrink-0 leading-none"
        onClick={e => e.stopPropagation()}
      >
        {hand.tileGroups.map(tg => (
          <TileGroupDisplay key={tg.id} group={tg} />
        ))}
      </div>

      {/* Spacer to push desc/xc/pts to the right */}
      <div className="flex-1 min-w-0" />

      {/* Description */}
      {hand.description && (
        <span className="text-[6px] text-stone-700 italic leading-none shrink-0 text-right mr-0.5">
          {hand.description}
        </span>
      )}

      {/* Concealed / Exposed + Points */}
      <span className={`text-[8px] font-bold w-[10px] text-right shrink-0 leading-none ${
        hand.concealed ? 'text-red-600' : 'text-stone-600'
      }`}>
        {hand.concealed ? 'C' : 'X'}
      </span>
      <span className="text-[8px] font-semibold text-stone-700 w-[14px] text-right shrink-0 leading-none">
        {hand.points}
      </span>
    </div>
  )
}
