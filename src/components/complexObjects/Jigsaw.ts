import type { Jigsaw } from "../../types/3dObjects"
import { jigsawBox } from "../3dObjects/JigsawBox"
import { jigsawTable } from "../3dObjects/JigsawTable"
import { jigsawPieces } from "./JigsawPieces"

export function jigsaw({
  posX = 0,
  posY = 0,
  posZ = 0,
  scale = 2,
} = {}): Jigsaw {
  const pieceScale = scale * 0.1
  const table = jigsawTable({
    posX,
    posY: posY - 7,
    posZ,
    scale: scale,
  })
  const pieces = jigsawPieces({
    posX: posX + table.params.topHeight * 1.17,
    posY: posY + table.height,
    posZ: posZ - table.params.topHeight * 0.92,
    pieceScale: pieceScale,
  })
  const box = jigsawBox({
    posX: posX + table.params.topHeight * 1.5,
    posY: posY + table.height * 0.99,
    posZ: posZ - table.params.topHeight * 0.6,
    scale: pieceScale * 1.2,
  })

  return { pieces, box, table }
}
