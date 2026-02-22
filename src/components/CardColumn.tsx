import type { HandGroup } from '../types'
import { GroupSection } from './GroupSection'

interface Props {
  groups: HandGroup[]
}

export function CardColumn({ groups }: Props) {
  return (
    <div className="card-column flex-1 overflow-y-auto bg-stone-50 flex flex-col">
      {groups.map(group => (
        <GroupSection key={group.id} group={group} />
      ))}
    </div>
  )
}
