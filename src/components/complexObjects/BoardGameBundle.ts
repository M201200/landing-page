import type { BoardGameBundle } from "../../types/3dObjects"
import { board } from "../3dObjects/Board"
import { boardGamePiece } from "../3dObjects/BoardGamePiece"
import { boardTable } from "../3dObjects/BoardTable"
import { dice } from "../3dObjects/Dice"

export function boardGameBundle({
  posX = 0,
  posY = 1,
  posZ = 0,
} = {}): BoardGameBundle {
  const Table = boardTable({ posX, posY: posY - 7, posZ, scale: 2.5 })
  const Board = board({ posX: posX, posY: Table.height, posZ: posZ })
  const PiecePosY = Table.height + Board.depth + 0.05
  const Dice = dice({
    posX: 0.34 * Board.size + posX,
    posY: Table.height,
    posZ: 0.6 * Board.size + posZ,
  })
  const RedPiece = boardGamePiece({
    color: "C33333",
    posX: Board.path[0].x,
    posY: PiecePosY,
    posZ: Board.path[0].z,
  })
  const BluePiece = boardGamePiece({
    color: "2A1BDA",
    posX: Board.path[0].x + RedPiece.params.basisBottom * 2.5,
    posY: PiecePosY,
    posZ: Board.path[0].z - RedPiece.params.basisBottom * 0.5,
  })
  const GreenPiece = boardGamePiece({
    color: "14AC10",
    posX: Board.path[0].x + RedPiece.params.basisBottom * 0.3,
    posY: PiecePosY,
    posZ: Board.path[0].z + RedPiece.params.basisBottom * 2.5,
  })
  const YellowPiece = boardGamePiece({
    color: "FFCF26",
    posX: Board.path[0].x + RedPiece.params.basisBottom * 3,
    posY: PiecePosY,
    posZ: Board.path[0].z + RedPiece.params.basisBottom * 2,
  })
  Board.model.name = "Board"
  Dice.model.name = "Dice"
  RedPiece.model.name = "RedPiece"
  BluePiece.model.name = "BluePiece"
  GreenPiece.model.name = "GreenPiece"
  YellowPiece.model.name = "YellowPiece"

  return {
    Board,
    Dice,
    Table,
    GamePieces: { RedPiece, BluePiece, GreenPiece, YellowPiece },
  }
}
