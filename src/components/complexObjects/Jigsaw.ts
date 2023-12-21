import { jigsawBox } from "../3dObjects/JigsawBox"
import { jigsawPieces, pieceScale } from "./JigsawPieces"

export function jigsaw({ posX = 0, posY = 0, posZ = 0 } = {}) {
  const pieces = jigsawPieces({ posX, posY, posZ })
  const box = jigsawBox({ posX, posY, posZ, scale: pieceScale })

  return { pieces, box }
}
