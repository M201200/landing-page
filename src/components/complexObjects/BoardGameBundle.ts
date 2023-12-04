import { board, boardParams } from "../3dObjects/Board"
import { boardGamePiece } from "../3dObjects/BoardGamePiece"
import { dice } from "../3dObjects/Dice"
import { tableHeight } from "../3dObjects/Table"

export const RedPieceInitialPosition = {
  x: -2.8,
  y: tableHeight + boardParams.depth + 0.05,
  z: 0,
}
export const BluePieceInitialPosition = {
  x: -2.5,
  y: tableHeight + boardParams.depth + 0.05,
  z: 0,
}
export const GreenPieceInitialPosition = {
  x: -2.8,
  y: tableHeight + boardParams.depth + 0.05,
  z: 0.25,
}
export const YellowPieceInitialPosition = {
  x: -2.5,
  y: tableHeight + boardParams.depth + 0.05,
  z: 0.25,
}

export function boardGameBundle() {
  const Board = board()
  const Dice = dice()
  const RedPiece = boardGamePiece("C33333")
  const BluePiece = boardGamePiece("2A1BDA")
  const GreenPiece = boardGamePiece("14AC10")
  const YellowPiece = boardGamePiece("FFCF26")
  Board.model.name = "Board"
  Dice.model.name = "Dice"
  RedPiece.model.name = "RedPiece"
  BluePiece.model.name = "BluePiece"
  GreenPiece.model.name = "GreenPiece"
  YellowPiece.model.name = "YellowPiece"

  Board.body.position.set(0, tableHeight + 0.02, 0)
  Dice.body.position.set(2.4, tableHeight + 3, 4)
  RedPiece.body.position.set(
    RedPieceInitialPosition.x,
    RedPieceInitialPosition.y,
    RedPieceInitialPosition.z
  )
  BluePiece.body.position.set(
    BluePieceInitialPosition.x,
    BluePieceInitialPosition.y,
    BluePieceInitialPosition.z
  )
  GreenPiece.body.position.set(
    GreenPieceInitialPosition.x,
    GreenPieceInitialPosition.y,
    GreenPieceInitialPosition.z
  )
  YellowPiece.body.position.set(
    YellowPieceInitialPosition.x,
    YellowPieceInitialPosition.y,
    YellowPieceInitialPosition.z
  )

  return [Board, Dice, RedPiece, BluePiece, GreenPiece, YellowPiece]
}
