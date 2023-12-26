import { TextureLoader, SRGBColorSpace, RepeatWrapping } from "three"

import type { JigsawPiece, JigsawPieces } from "../../types/3dObjects"

import { puzzlePiece } from "../3dObjects/PuzzlePiece"

export function jigsawPieces({
  posX = 0,
  posY = 0,
  posZ = 0,
  pieceScale = 0.2,
  columns = 5,
  rows = 5,
} = {}): JigsawPieces {
  const textureLoader = new TextureLoader()
  const texture = textureLoader.load("/images/nature.jpg")
  texture.colorSpace = SRGBColorSpace
  texture.wrapS = texture.wrapT = RepeatWrapping

  const textureOffsetX = 1 / columns
  const textureOffsetY = 1 / rows

  let jigsawPieces: JigsawPiece[] = []

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

  jigsawPieces.push(
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
      column: columns,
      row: 0,
    }),

    puzzlePiece({
      scale: pieceScale,
      texture: bottomRightCornerTexture,
      corner: true,
      column: columns,
      row: rows,
    }),

    puzzlePiece({
      scale: pieceScale,
      texture: bottomLeftCornerTexture,
      corner: true,
      column: 0,
      row: rows,
    })
  )

  for (let i = 0; i < columns - 2; i++) {
    const topSideTexture = texture.clone()
    topSideTexture.repeat.set(textureOffsetX, textureOffsetY)
    topSideTexture.offset.set((i + 1) * textureOffsetX, -textureOffsetY)
    topSideTexture.rotation = 0

    jigsawPieces.push(
      puzzlePiece({
        scale: pieceScale,
        texture: topSideTexture,
        side: true,
        column: i + 1,
        row: 0,
      })
    )
  }

  for (let i = 0; i < rows - 2; i++) {
    const rightSideTexture = texture.clone()
    rightSideTexture.repeat.set(textureOffsetX, textureOffsetY)
    rightSideTexture.offset.set(-textureOffsetX, (i + 2) * textureOffsetY)
    rightSideTexture.rotation = 1.5708

    jigsawPieces.push(
      puzzlePiece({
        scale: pieceScale,
        texture: rightSideTexture,
        oppositeSide: true,
        column: columns,
        row: i + 1,
      })
    )
  }

  for (let i = 0; i < columns - 2; i++) {
    const bottomSideTexture = texture.clone()
    bottomSideTexture.repeat.set(textureOffsetX, textureOffsetY)
    bottomSideTexture.offset.set((i + 2) * textureOffsetX, textureOffsetY)
    bottomSideTexture.rotation = 1.5708 * 2

    jigsawPieces.push(
      puzzlePiece({
        scale: pieceScale,
        texture: bottomSideTexture,
        oppositeSide: true,
        column: columns - i - 1,
        row: rows,
      })
    )
  }

  for (let i = 0; i < rows - 2; i++) {
    const leftSideTexture = texture.clone()
    leftSideTexture.repeat.set(textureOffsetX, textureOffsetY)
    leftSideTexture.offset.set(textureOffsetX, (i + 1) * textureOffsetY)
    leftSideTexture.rotation = -1.5708

    jigsawPieces.push(
      puzzlePiece({
        scale: pieceScale,
        texture: leftSideTexture,
        side: true,
        column: 0,
        row: rows - i - 1,
      })
    )
  }

  for (let i = 0; i < columns - 2; i++) {
    for (let j = 0; j < rows - 2; j++) {
      const pieceTexture = texture.clone()
      pieceTexture.repeat.set(textureOffsetX, textureOffsetY)
      pieceTexture.offset.set(
        textureOffsetX + i * textureOffsetX,
        textureOffsetY + j * textureOffsetY
      )
      jigsawPieces.push(
        puzzlePiece({
          scale: pieceScale,
          texture: pieceTexture,
          column: i + 1,
          row: j + 1,
        })
      )
    }
  }

  jigsawPieces.forEach((piece, idx, arr) => {
    const totalPieces = arr.length
    const piecesInCell = totalPieces >= 10 ? 10 : totalPieces
    const columns = totalPieces >= 20 ? 2 : totalPieces / 2

    const rowPosition = Math.ceil((idx + 1) / (columns * piecesInCell))
    const columnPosition = Math.ceil(
      Math.ceil((idx + 1) / piecesInCell) / rowPosition
    )
    const cellPosition = idx % 10

    piece.model.position.set(
      columnPosition * pieceScale + posX,
      cellPosition * piece.params.depth * 50 * pieceScale + posY,
      rowPosition * pieceScale + posZ
    )
  })

  return { jigsawPieces, columns, rows, pieceScale }
}
