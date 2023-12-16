import { board, boardParams } from "../3dObjects/Board"
import { boardGamePiece } from "../3dObjects/BoardGamePiece"
import { dice } from "../3dObjects/Dice"
import { tableHeight } from "../3dObjects/Table"

// export const RedPieceInitialPosition = {
//   x: -2.8,
//   y: tableHeight + boardParams.depth + 0.05,
//   z: 0,
// }
// export const BluePieceInitialPosition = {
//   x: -2.5,
//   y: tableHeight + boardParams.depth + 0.05,
//   z: 0,
// }
// export const GreenPieceInitialPosition = {
//   x: -2.8,
//   y: tableHeight + boardParams.depth + 0.05,
//   z: 0.25,
// }
// export const YellowPieceInitialPosition = {
//   x: -2.5,
//   y: tableHeight + boardParams.depth + 0.05,
//   z: 0.25,
// }

export function boardGameBundle({ posX = 0, posY = 1, posZ = 0 } = {}) {
  const PiecePosY = tableHeight + boardParams.depth + 0.05 + posY
  const Board = board({ posX: posX, posY: posY, posZ: posZ })
  const Dice = dice({
    posX: 0.34 * boardParams.size + posX,
    posY: tableHeight + 3 + posY,
    posZ: 0.6 * boardParams.size + posZ,
  })
  const RedPiece = boardGamePiece({
    color: "C33333",
    posX: -0.4 * boardParams.size + posX,
    posY: PiecePosY,
    posZ: 0 * boardParams.size + posZ,
  })
  const BluePiece = boardGamePiece({
    color: "2A1BDA",
    posX: -0.36 * boardParams.size + posX,
    posY: PiecePosY,
    posZ: 0 * boardParams.size + posZ,
  })
  const GreenPiece = boardGamePiece({
    color: "14AC10",
    posX: -0.4 * boardParams.size + posX,
    posY: PiecePosY,
    posZ: 0.36 * boardParams.size + posZ,
  })
  const YellowPiece = boardGamePiece({
    color: "FFCF26",
    posX: -0.36 * boardParams.size + posX,
    posY: PiecePosY,
    posZ: 0.36 * boardParams.size + posZ,
  })
  Board.model.name = "Board"
  Dice.model.name = "Dice"
  RedPiece.model.name = "RedPiece"
  BluePiece.model.name = "BluePiece"
  GreenPiece.model.name = "GreenPiece"
  YellowPiece.model.name = "YellowPiece"

  return [Board, Dice, RedPiece, BluePiece, GreenPiece, YellowPiece]
}
