import { Mesh, Group } from "three"

import { Body } from "cannon-es"

export type PhysicalObject = {
  model: Group | Mesh
  body: Body
}

export type BoardGameBundle = {
  Board: Board
  Dice: PhysicalObject
  Table: BoardTable
  GamePieces: {
    RedPiece: BoardGamePiece
    BluePiece: BoardGamePiece
    GreenPiece: BoardGamePiece
    YellowPiece: BoardGamePiece
  }
}

export type Board = PhysicalObject & {
  size: number
  depth: number
  path: {
    x: number
    z: number
  }[]
}

export type BoardTable = PhysicalObject & {
  params: BoardTableParams
  height: number
}

export type BoardTableParams = {
  topRadiusTop: number
  topRadiusBottom: number
  topDepth: number
  topSegments: number
  legSize: number
  legHeight: number
  legRadius: number
}

export type BoardGamePiece = PhysicalObject & {
  params: BoardGamePieceParams
}

export type BoardGamePieceParams = {
  basisTop: number
  basisBottom: number
  basisHeight: number
  segments: number
  bodyTop: number
  bodyBottom: number
  apexRadius: number
  apexWidthSegments: number
  apexHeightSegments: number
}

export type JigsawTable = {
  model: Group
  params: JigsawTableParams
  height: number
}

export type JigsawTableParams = {
  topWidth: number
  topHeight: number
  topDepth: number
  topRadius: number
  legSize: number
  legHeight: number
  legRadius: number
  scale: number
}
export type JigsawBox = {
  model: Group
  params: JigsawBoxParams
}

export type JigsawBoxParams = {
  size: number
  height: number
  depth: number
  lidSize: number
}
export type JigsawPiece = {
  model: Group | Mesh
  column: number
  row: number
  params: JigsawPieceParams
}

export type JigsawPieceParams = {
  size: number
  depth: number
  offset: number
  scale: number
}

export type JigsawPieces = {
  jigsawPieces: JigsawPiece[]
  columns: number
  rows: number
  pieceScale: number
}

export type Jigsaw = {
  pieces: JigsawPieces
  box: JigsawBox
  table: JigsawTable
}

export type CardTable = {
  model: Group
  radius: number
  height: number
  params: CardTableParams
}

export type CardTableParams = {
  topRadius: number
  topHeight: number
  topSegments: number
  borderRadialSegments: number
  borderTubularSegments: number
  legSize: number
  legHeight: number
  scale: number
}

export type GameCard = {
  model: Group | Mesh
  faceColor: string
  number: number
  params: GameCardParams
}

export type GameCardParams = {
  width: number
  height: number
  depth: number
  segments: number
  radius: number
}

export type Deck = {
  cards: GameCard[]
  box: Group
  table: CardTable
}
