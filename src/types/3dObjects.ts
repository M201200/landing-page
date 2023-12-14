import { Mesh, Group } from "three"

import { Body } from "cannon-es"

export type PhysicalObject = {
  model: Group | Mesh
  body: Body
}
export type JigsawPiece = {
  model: Group | Mesh
  column: number
  row: number
}

export type GameCard = {
  model: Group | Mesh
  faceColor: string
  number: number
}
