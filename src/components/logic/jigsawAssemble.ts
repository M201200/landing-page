import gsap from "gsap"
import type { JigsawPiece } from "../../types/3dObjects"
import { jigsawColumns, jigsawRows, pieceScale } from "../complexObjects/Jigsaw"
import { tableHeight } from "../3dObjects/Table"

const jigsawRadiusX = (pieceScale * jigsawColumns) / 2 - pieceScale / 2
const jigsawRadiusZ = (pieceScale * jigsawRows) / 2 - pieceScale / 2

export function jigsawAssemble(jigsaw: JigsawPiece[]) {
  const delay = 0.4
  const duration = 0.4
  jigsaw.forEach((piece, idx) => {
    if (
      piece.column > 0 &&
      piece.column < jigsawColumns &&
      piece.row > 0 &&
      piece.row < jigsawRows
    ) {
      gsap
        .to(piece.body.position, {
          x: -jigsawRadiusX + pieceScale + (piece.column - 1) * pieceScale,
          y: tableHeight + 1,
          z: jigsawRadiusZ - pieceScale - (piece.row - 1) * pieceScale,
        })
        .delay(delay * idx)
        .duration(duration)
      gsap
        .to(piece.body.position, {
          y: tableHeight,
        })
        .delay(delay * idx + duration)
        .duration(duration / 2)
    }

    if (piece.column > 0 && piece.column < jigsawColumns && piece.row === 0) {
      gsap
        .to(piece.body.position, {
          x: -jigsawRadiusX + pieceScale + (piece.column - 1) * pieceScale,
          y: tableHeight + 1,
          z: -jigsawRadiusZ,
        })
        .delay(delay * idx)
        .duration(duration)
      gsap
        .to(piece.body.position, {
          y: tableHeight,
        })
        .delay(delay * idx + duration)
        .duration(duration / 2)
    }
    if (
      piece.column === jigsawColumns &&
      piece.row > 0 &&
      piece.row < jigsawRows
    ) {
      gsap
        .to(piece.body.position, {
          x: jigsawRadiusX,
          y: tableHeight + 1,
          z: jigsawRadiusZ - pieceScale - (piece.row - 1) * pieceScale,
        })
        .delay(delay * idx)
        .duration(duration)
      gsap
        .to(piece.body.position, {
          y: tableHeight,
        })
        .delay(delay * idx + duration)
        .duration(duration / 2)
      gsap
        .to(piece.body.quaternion, { x: 0.5, y: 0.5, z: 0.5, w: -0.5 })
        .delay(delay * idx + duration / 2)
        .duration(duration / 2)
    }
    if (
      piece.column > 0 &&
      piece.column < jigsawColumns &&
      piece.row === jigsawRows
    ) {
      gsap
        .to(piece.body.position, {
          x: jigsawRadiusX - pieceScale - (piece.column - 2) * pieceScale,
          y: tableHeight + 1,
          z: jigsawRadiusZ,
        })
        .delay(delay * idx)
        .duration(duration)
      gsap
        .to(piece.body.position, {
          y: tableHeight,
        })
        .delay(delay * idx + duration)
        .duration(duration / 2)
      gsap
        .to(piece.body.quaternion, { x: 0, y: 0.7071, z: 0.7071, w: 0 })
        .delay(delay * idx + duration / 2)
        .duration(duration / 2)
    }
    if (piece.column === 0 && piece.row > 0 && piece.row < jigsawRows) {
      gsap
        .to(piece.body.position, {
          x: -jigsawRadiusX,
          y: tableHeight + 1,
          z: -jigsawRadiusZ + pieceScale + (piece.row - 2) * pieceScale,
        })
        .delay(delay * idx)
        .duration(duration)
      gsap
        .to(piece.body.position, {
          y: tableHeight,
        })
        .delay(delay * idx + duration)
        .duration(duration / 2)
      gsap
        .to(piece.body.quaternion, { x: -0.5, y: 0.5, z: 0.5, w: 0.5 })
        .delay(delay * idx + duration / 2)
        .duration(duration / 2)
    }

    if (piece.column === 0 && piece.row === 0) {
      gsap
        .to(piece.body.position, {
          x: -jigsawRadiusX,
          y: tableHeight + 1,
          z: -jigsawRadiusZ,
        })
        .delay(delay * idx)
        .duration(duration)
      gsap
        .to(piece.body.position, {
          y: tableHeight,
        })
        .delay(delay * idx + duration)
        .duration(duration / 2)
    }
    if (piece.column === jigsawColumns && piece.row === 0) {
      gsap
        .to(piece.body.position, {
          x: jigsawRadiusX,
          y: tableHeight + 1,
          z: -jigsawRadiusZ,
        })
        .delay(delay * idx)
        .duration(duration)
      gsap
        .to(piece.body.position, {
          y: tableHeight,
        })
        .delay(delay * idx + duration)
        .duration(duration / 2)
      gsap
        .to(piece.body.quaternion, { x: 0.5, y: 0.5, z: 0.5, w: -0.5 })
        .delay(delay * idx + duration / 2)
        .duration(duration / 2)
    }
    if (piece.column === jigsawColumns && piece.row === jigsawRows) {
      gsap
        .to(piece.body.position, {
          x: jigsawRadiusX,
          y: tableHeight + 1,
          z: jigsawRadiusZ,
        })
        .delay(delay * idx)
        .duration(duration)
      gsap
        .to(piece.body.position, {
          y: tableHeight,
        })
        .delay(delay * idx + duration)
        .duration(duration / 2)
      gsap
        .to(piece.body.quaternion, { x: 0, y: 0.7071, z: 0.7071, w: 0 })
        .delay(delay * idx + duration / 2)
        .duration(duration / 2)
    }
    if (piece.column === 0 && piece.row === jigsawRows) {
      gsap
        .to(piece.body.position, {
          x: -jigsawRadiusX,
          y: tableHeight + 1,
          z: jigsawRadiusZ,
        })
        .delay(delay * idx)
        .duration(duration)
      gsap
        .to(piece.body.position, {
          y: tableHeight,
        })
        .delay(delay * idx + duration)
        .duration(duration / 2)
      gsap
        .to(piece.body.quaternion, { x: -0.5, y: 0.5, z: 0.5, w: 0.5 })
        .delay(delay * idx + duration / 2)
        .duration(duration / 2)
    }
  })
}
