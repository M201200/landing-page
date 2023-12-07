import { Mesh, Group } from "three"

import { Body } from "cannon-es"

export type PhysicalObject = {
  model: Group | Mesh
  body: Body
}
export type JigsawPiece = PhysicalObject & {
  column: number
  row: number
}

export type GameCard = PhysicalObject & {
  faceColor: string
  number: number
}
