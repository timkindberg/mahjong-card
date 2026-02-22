export type SuitColor = "red" | "green" | "blue"
export type TileType = "flower" | "number" | "dragon" | "wind" | "zero" | "operator"

export interface TileGroup {
  id: string
  display: string
  tileType: TileType
  tileValue: string
  count: number
  suitColor?: SuitColor
}

export interface Hand {
  id: string
  groupId: string
  number: string
  tileGroups: TileGroup[]
  description: string
  concealed: boolean
  points: number
}

export interface HandGroup {
  id: string
  name: string
  hands: Hand[]
  column: 1 | 2 | 3
}
