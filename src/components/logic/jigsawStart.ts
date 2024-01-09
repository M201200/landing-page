import gsap from "gsap"
import type { Jigsaw } from "../../types/3dObjects"

export function jigsawStart(jigsaw: Jigsaw) {
  const duration = 0.3
  const pieceScale = jigsaw.pieces.pieceScale
  const pieceSize = jigsaw.pieces.jigsawPieces[0].params.size * pieceScale
  const pieceDepth = jigsaw.pieces.jigsawPieces[0].params.depth * pieceScale
  const tableScale = jigsaw.table.params.scale
  const tableHeight = jigsaw.table.height
  const tableLength = jigsaw.table.params.topHeight * tableScale
  const tableWidth = jigsaw.table.params.topWidth * tableScale
  const tableBottomLeftPosition = {
    x: jigsaw.table.model.position.x - tableWidth / 2 + pieceSize * 1.1,
    z: jigsaw.table.model.position.z + tableLength / 2 - pieceSize * 1.1,
  }

  jigsaw.box.model.children.forEach((part) => {
    if (part.name === "lid") {
      const offset = 2.5

      const posY = part.position.y + offset
      const posZ = part.position.z + offset

      gsap.to(part.position, {
        y: posY,
        duration: duration,
      })
      gsap.to(part.position, {
        z: posZ,
        duration: duration,
      })
      gsap.to(part.position, {
        y: posY - offset - 0.1,
        duration: duration,
      })
    }
  })
  let secondRow = 0
  jigsaw.pieces.jigsawPieces.forEach((piece, idx) => {
    const random = Math.random()
    const posY = piece.model.position.y + 2

    if (
      tableBottomLeftPosition.x + pieceScale * idx * 1.8 >=
      tableBottomLeftPosition.x + tableWidth
    ) {
      gsap.to(piece.model.position, {
        y: posY,
        duration: duration,
        delay: duration,
      })
      gsap.to(piece.model.position, {
        x: tableBottomLeftPosition.x + pieceScale * secondRow * 1.5,
        y: tableHeight + pieceDepth * 10,
        z: tableBottomLeftPosition.z - pieceScale * 1.5,
        duration: duration,
        delay: duration * 2,
      })
      gsap.to(piece.model.rotation, {
        z: random,
        duration,
        delay: duration * 2,
      })
      secondRow++
    } else {
      gsap.to(piece.model.position, {
        y: posY,
        duration: duration,
        delay: duration,
      })
      gsap.to(piece.model.position, {
        x: tableBottomLeftPosition.x + pieceScale * idx * 1.5,
        y: tableHeight + pieceDepth * 10,
        z: tableBottomLeftPosition.z,
        duration: duration,
        delay: duration * 2,
      })
      gsap.to(piece.model.rotation, {
        z: random,
        duration,
        delay: duration * 2,
      })
    }
  })
}
