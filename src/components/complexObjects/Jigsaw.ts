import { TextureLoader, SRGBColorSpace, RepeatWrapping } from "three"

import type { PhysicalObject } from "../../types/3dObjects"

import { puzzlePiece } from "../3dObjects/PuzzlePiece"

const textureLoader = new TextureLoader()
const texture = textureLoader.load("/public/images/nature.jpg")
texture.colorSpace = SRGBColorSpace
texture.wrapS = texture.wrapT = RepeatWrapping

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

const pieceScale = 1
const columns = 5
const rows = 5

const jigsawRadiusX = (pieceScale * columns) / 2 - pieceScale / 2
const jigsawRadiusZ = (pieceScale * rows) / 2 - pieceScale / 2

const textureOffsetX = 1 / columns
const textureOffsetY = 1 / rows

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

export function jigsaw(): PhysicalObject[] {
  let jigsaw: PhysicalObject[] = []

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
      posX: -jigsawRadiusX,
      posZ: -jigsawRadiusZ,
      rotZ: 0,
    }),

    puzzlePiece({
      scale: pieceScale,
      texture: topRightCornerTexture,
      corner: true,
      posX: jigsawRadiusX,
      posZ: -jigsawRadiusZ,
      rotZ: -1.5708,
    }),

    puzzlePiece({
      scale: pieceScale,
      texture: bottomRightCornerTexture,
      corner: true,
      posX: jigsawRadiusX,
      posZ: jigsawRadiusZ,
      rotZ: 1.5708 * 2,
    }),

    puzzlePiece({
      scale: pieceScale,
      texture: bottomLeftCornerTexture,
      corner: true,
      posX: -jigsawRadiusX,
      posZ: jigsawRadiusZ,
      rotZ: 1.5708,
    })
  )

  for (let i = 0; i < columns - 2; i++) {
    const topSideTexture = texture.clone()
    topSideTexture.repeat.set(textureOffsetX, textureOffsetY)
    topSideTexture.offset.set((i + 1) * textureOffsetX, -textureOffsetY)
    topSideTexture.rotation = 0

    jigsaw.push(
      puzzlePiece({
        scale: pieceScale,
        texture: topSideTexture,
        side: true,
        posX: -jigsawRadiusX + pieceScale + i * pieceScale,
        posZ: -jigsawRadiusZ,
        rotZ: 0,
      })
    )
  }

  for (let i = 0; i < rows - 2; i++) {
    const rightSideTexture = texture.clone()
    rightSideTexture.repeat.set(textureOffsetX, textureOffsetY)
    rightSideTexture.offset.set(-textureOffsetX, (i + 2) * textureOffsetY)
    rightSideTexture.rotation = 1.5708

    jigsaw.push(
      puzzlePiece({
        scale: pieceScale,
        texture: rightSideTexture,
        oppositeSide: true,
        posX: jigsawRadiusX,
        posZ: jigsawRadiusZ - pieceScale - i * pieceScale,
        rotZ: -1.5708,
      })
    )
  }

  for (let i = 0; i < columns - 2; i++) {
    const bottomSideTexture = texture.clone()
    bottomSideTexture.repeat.set(textureOffsetX, textureOffsetY)
    bottomSideTexture.offset.set((i + 2) * textureOffsetX, textureOffsetY)
    bottomSideTexture.rotation = 1.5708 * 2

    jigsaw.push(
      puzzlePiece({
        scale: pieceScale,
        texture: bottomSideTexture,
        oppositeSide: true,
        posX: -jigsawRadiusX + pieceScale + i * pieceScale,
        posZ: jigsawRadiusZ,
        rotZ: 1.5708 * 2,
      })
    )
  }

  for (let i = 0; i < rows - 2; i++) {
    const leftSideTexture = texture.clone()
    leftSideTexture.repeat.set(textureOffsetX, textureOffsetY)
    leftSideTexture.offset.set(textureOffsetX, (i + 1) * textureOffsetY)
    leftSideTexture.rotation = -1.5708

    jigsaw.push(
      puzzlePiece({
        scale: pieceScale,
        texture: leftSideTexture,
        side: true,
        posX: -jigsawRadiusX,
        posZ: jigsawRadiusZ - pieceScale - i * pieceScale,
        rotZ: 1.5708,
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
      jigsaw.push(
        puzzlePiece({
          scale: pieceScale,
          texture: pieceTexture,
          posX: -jigsawRadiusX + pieceScale + i * pieceScale,
          posZ: jigsawRadiusZ - pieceScale - j * pieceScale,
          rotZ: 0,
        })
      )
    }
  }

  return jigsaw
}
