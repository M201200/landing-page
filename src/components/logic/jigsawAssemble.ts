import gsap from "gsap"
import type { JigsawPiece } from "../../types/3dObjects"
import { tableHeight } from "../3dObjects/Table"
import { jigsawColumns, jigsawRows, pieceScale } from "../complexObjects/Jigsaw"

const jigsawRadiusX = (pieceScale * jigsawColumns) / 2 - pieceScale / 2
const jigsawRadiusZ = (pieceScale * jigsawRows) / 2 - pieceScale / 2

export function jigsawAssemble(
  jigsaw: JigsawPiece[],
  { posX = 0, posY = 0, posZ = 0 } = {}
) {
  jigsaw.forEach((piece, idx) => {
    if (
      piece.column > 0 &&
      piece.column < jigsawColumns &&
      piece.row > 0 &&
      piece.row < jigsawRows
    ) {
      assembleAnimation({
        piece: piece,
        index: idx,
        toX:
          -jigsawRadiusX + pieceScale + (piece.column - 1) * pieceScale + posX,
        toY: tableHeight + posY,
        toZ: jigsawRadiusZ - pieceScale - (piece.row - 1) * pieceScale + posZ,
      })
    }

    if (piece.column > 0 && piece.column < jigsawColumns && piece.row === 0) {
      assembleAnimation({
        piece: piece,
        index: idx,
        toX:
          -jigsawRadiusX + pieceScale + (piece.column - 1) * pieceScale + posX,
        toY: tableHeight + posY,
        toZ: -jigsawRadiusZ + posZ,
      })
    }
    if (
      piece.column === jigsawColumns &&
      piece.row > 0 &&
      piece.row < jigsawRows
    ) {
      assembleAnimation({
        piece: piece,
        index: idx,
        toX: jigsawRadiusX + posX,
        toY: tableHeight + posY,
        toZ: jigsawRadiusZ - pieceScale - (piece.row - 1) * pieceScale + posZ,
        rotate: true,
        rotX: 0.5,
        rotY: 0.5,
        rotZ: 0.5,
        rotW: -0.5,
      })
    }
    if (
      piece.column > 0 &&
      piece.column < jigsawColumns &&
      piece.row === jigsawRows
    ) {
      assembleAnimation({
        piece: piece,
        index: idx,
        toX:
          jigsawRadiusX - pieceScale - (piece.column - 2) * pieceScale + posX,
        toY: tableHeight + posY,
        toZ: jigsawRadiusZ + posZ,
        rotate: true,
        rotX: 0,
        rotY: 0.7071,
        rotZ: 0.7071,
        rotW: 0,
      })
    }
    if (piece.column === 0 && piece.row > 0 && piece.row < jigsawRows) {
      assembleAnimation({
        piece: piece,
        index: idx,
        toX: -jigsawRadiusX + posX,
        toY: tableHeight + posY,
        toZ: -jigsawRadiusZ + pieceScale + (piece.row - 2) * pieceScale + posZ,
        rotate: true,
        rotX: -0.5,
        rotY: 0.5,
        rotZ: 0.5,
        rotW: 0.5,
      })
    }

    if (piece.column === 0 && piece.row === 0) {
      assembleAnimation({
        piece: piece,
        index: idx,
        toX: -jigsawRadiusX + posX,
        toY: tableHeight + posY,
        toZ: -jigsawRadiusZ + posZ,
      })
    }
    if (piece.column === jigsawColumns && piece.row === 0) {
      assembleAnimation({
        piece: piece,
        index: idx,
        toX: jigsawRadiusX + posX,
        toY: tableHeight + posY,
        toZ: -jigsawRadiusZ + posZ,
        rotate: true,
        rotX: 0.5,
        rotY: 0.5,
        rotZ: 0.5,
        rotW: -0.5,
      })
    }
    if (piece.column === jigsawColumns && piece.row === jigsawRows) {
      assembleAnimation({
        piece: piece,
        index: idx,
        toX: jigsawRadiusX + posX,
        toY: tableHeight + posY,
        toZ: jigsawRadiusZ + posZ,
        rotate: true,
        rotX: 0,
        rotY: 0.7071,
        rotZ: 0.7071,
        rotW: 0,
      })
    }
    if (piece.column === 0 && piece.row === jigsawRows) {
      assembleAnimation({
        piece: piece,
        index: idx,
        toX: -jigsawRadiusX + posX,
        toY: tableHeight + posY,
        toZ: jigsawRadiusZ + posZ,
        rotate: true,
        rotX: -0.5,
        rotY: 0.5,
        rotZ: 0.5,
        rotW: 0.5,
      })
    }
  })
}

type AssembleAnimation = {
  piece: JigsawPiece
  index: number
  toX?: number
  toY?: number
  toZ?: number
  rotate?: boolean
  rotX?: number
  rotY?: number
  rotZ?: number
  rotW?: number
}

function assembleAnimation({
  piece,
  index,
  toX = 0,
  toY = 0,
  toZ = 0,
  rotate = false,
  rotX,
  rotY,
  rotZ,
  rotW,
}: AssembleAnimation) {
  const delay = 0.4
  const duration = 0.4

  gsap.to(piece.model.position, {
    x: toX,
    y: toY + 1,
    z: toZ,
    delay: delay * index,
    duration: duration,
  })

  gsap.to(piece.model.position, {
    y: toY,
    delay: delay * index + duration,
    duration: duration / 2,
  })

  if (rotate) {
    gsap.to(piece.model.quaternion, {
      x: rotX,
      y: rotY,
      z: rotZ,
      w: rotW,
      delay: delay * index + duration / 2,
      duration: duration / 2,
    })
  }
}
