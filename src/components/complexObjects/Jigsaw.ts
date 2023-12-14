import { TextureLoader, SRGBColorSpace, RepeatWrapping } from "three"

import type { JigsawPiece } from "../../types/3dObjects"

import { pieceDepth, puzzlePiece } from "../3dObjects/PuzzlePiece"

const textureLoader = new TextureLoader()
const texture = textureLoader.load("/public/images/nature.jpg")
texture.colorSpace = SRGBColorSpace
texture.wrapS = texture.wrapT = RepeatWrapping

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pieceScale = 0.8
export const jigsawColumns = 5
export const jigsawRows = 5

const textureOffsetX = 1 / jigsawColumns
const textureOffsetY = 1 / jigsawRows

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

export function jigsaw(): JigsawPiece[] {
  let jigsaw: JigsawPiece[] = []

  const topLeftCornerTexture = texture.clone()
  topLeftCornerTexture.repeat.set(textureOffsetX, textureOffsetY)
  topLeftCornerTexture.offset.set(0, -textureOffsetY)
  topLeftCornerTexture.rotation = 0

  const topRightCornerTexture = texture.clone()
  topRightCornerTexture.repeat.set(textureOffsetX, textureOffsetY)
  topRightCornerTexture.offset.set(-textureOffsetX, 0)
  topRightCornerTexture.rotation = 1.5708

  const bottomRightCornerTexture = texture.clone()
  bottomRightCornerTexture.repeat.set(textureOffsetX, textureOffsetY)
  bottomRightCornerTexture.offset.set(0, textureOffsetY)
  bottomRightCornerTexture.rotation = 1.5708 * 2

  const bottomLeftCornerTexture = texture.clone()
  bottomLeftCornerTexture.repeat.set(textureOffsetX, textureOffsetY)
  bottomLeftCornerTexture.offset.set(textureOffsetX, 0)
  bottomLeftCornerTexture.rotation = -1.5708

  jigsaw.push(
    puzzlePiece({
      scale: pieceScale,
      texture: topLeftCornerTexture,
      corner: true,
      column: 0,
      row: 0,
    }),

    puzzlePiece({
      scale: pieceScale,
      texture: topRightCornerTexture,
      corner: true,
      column: jigsawColumns,
      row: 0,
    }),

    puzzlePiece({
      scale: pieceScale,
      texture: bottomRightCornerTexture,
      corner: true,
      column: jigsawColumns,
      row: jigsawRows,
    }),

    puzzlePiece({
      scale: pieceScale,
      texture: bottomLeftCornerTexture,
      corner: true,
      column: 0,
      row: jigsawRows,
    })
  )

  for (let i = 0; i < jigsawColumns - 2; i++) {
    const topSideTexture = texture.clone()
    topSideTexture.repeat.set(textureOffsetX, textureOffsetY)
    topSideTexture.offset.set((i + 1) * textureOffsetX, -textureOffsetY)
    topSideTexture.rotation = 0

    jigsaw.push(
      puzzlePiece({
        scale: pieceScale,
        texture: topSideTexture,
        side: true,
        column: i + 1,
        row: 0,
      })
    )
  }

  for (let i = 0; i < jigsawRows - 2; i++) {
    const rightSideTexture = texture.clone()
    rightSideTexture.repeat.set(textureOffsetX, textureOffsetY)
    rightSideTexture.offset.set(-textureOffsetX, (i + 2) * textureOffsetY)
    rightSideTexture.rotation = 1.5708

    jigsaw.push(
      puzzlePiece({
        scale: pieceScale,
        texture: rightSideTexture,
        oppositeSide: true,
        column: jigsawColumns,
        row: i + 1,
      })
    )
  }

  for (let i = 0; i < jigsawColumns - 2; i++) {
    const bottomSideTexture = texture.clone()
    bottomSideTexture.repeat.set(textureOffsetX, textureOffsetY)
    bottomSideTexture.offset.set((i + 2) * textureOffsetX, textureOffsetY)
    bottomSideTexture.rotation = 1.5708 * 2

    jigsaw.push(
      puzzlePiece({
        scale: pieceScale,
        texture: bottomSideTexture,
        oppositeSide: true,
        column: jigsawColumns - i - 1,
        row: jigsawRows,
      })
    )
  }

  for (let i = 0; i < jigsawRows - 2; i++) {
    const leftSideTexture = texture.clone()
    leftSideTexture.repeat.set(textureOffsetX, textureOffsetY)
    leftSideTexture.offset.set(textureOffsetX, (i + 1) * textureOffsetY)
    leftSideTexture.rotation = -1.5708

    jigsaw.push(
      puzzlePiece({
        scale: pieceScale,
        texture: leftSideTexture,
        side: true,
        column: 0,
        row: jigsawRows - i - 1,
      })
    )
  }

  for (let i = 0; i < jigsawColumns - 2; i++) {
    for (let j = 0; j < jigsawRows - 2; j++) {
      const pieceTexture = texture.clone()
      pieceTexture.repeat.set(textureOffsetX, textureOffsetY)
      pieceTexture.offset.set(
        textureOffsetX + i * textureOffsetX,
        textureOffsetY + j * textureOffsetY
      )
      jigsaw.push(
        puzzlePiece({
          scale: pieceScale,
          texture: pieceTexture,
          column: i + 1,
          row: j + 1,
        })
      )
    }
  }

  jigsaw.forEach((piece, idx, arr) => {
    const totalPieces = arr.length
    const piecesInCell = totalPieces >= 5 ? 5 : totalPieces
    const columns = totalPieces >= 15 ? 3 : totalPieces / 3

    const rowPosition = Math.ceil((idx + 1) / (columns * piecesInCell))
    const columnPosition = Math.ceil(
      Math.ceil((idx + 1) / piecesInCell) / rowPosition
    )
    const cellPosition = idx % 5

    piece.model.position.set(
      -2 + columnPosition,
      cellPosition * pieceDepth * 50,
      2.5 + rowPosition
    )
  })

  return jigsaw
}
