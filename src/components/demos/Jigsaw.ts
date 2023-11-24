import { Body, type World } from "cannon-es"
import {
  TextureLoader,
  Group,
  SRGBColorSpace,
  RepeatWrapping,
  type Scene,
  Mesh,
} from "three"
import { puzzlePiece } from "../3dObjects/PuzzlePiece"

type PhysicalObject = {
  model: Group | Mesh
  body: Body
}

export function jigsaw(scene: Scene, world: World): PhysicalObject[] {
  let jigsaw: PhysicalObject[] = []
  const textureLoader = new TextureLoader()

  const texture = textureLoader.load("/public/images/nature.jpg")
  texture.colorSpace = SRGBColorSpace
  texture.wrapS = texture.wrapT = RepeatWrapping
  texture.repeat.set(1, 1)
  texture.offset.set(0, 0)

  jigsaw.push(
    puzzlePiece({ corner: true, posX: -2, posZ: -2, rotZ: 0 }),
    puzzlePiece({ corner: true, posX: -2, posZ: 2, rotZ: 1.5708 }),
    puzzlePiece({ corner: true, posX: 2, posZ: 2, rotZ: 1.5708 * 2 }),
    puzzlePiece({ corner: true, posX: 2, posZ: -2, rotZ: 1.5708 * 3 })
  )

  for (let i = 0; i < 7; i++) {
    jigsaw.push(
      puzzlePiece({
        side: true,
        posX: -1.5 + i / 2,
        posZ: -2,
        rotZ: 0,
      })
    )
    jigsaw.push(
      puzzlePiece({
        side: true,
        posX: -2,
        posZ: 1.5 - i / 2,
        rotZ: 1.5708,
      })
    )
    jigsaw.push(
      puzzlePiece({
        oppositeSide: true,
        posX: 1.5 - i / 2,
        posZ: 2,
        rotZ: 1.5708 * 2,
      })
    )
    jigsaw.push(
      puzzlePiece({
        oppositeSide: true,
        posX: 2,
        posZ: 1.5 - i / 2,
        rotZ: 1.5708 * 3,
      })
    )
  }

  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      const personalTexture = texture.clone()
      const repeat = 0.1428
      personalTexture.repeat.set(repeat, repeat)
      personalTexture.offset.set(i * repeat, j * repeat)
      jigsaw.push(
        puzzlePiece({
          texture: personalTexture,
          posX: -1.5 + i * 0.5,
          posZ: 1.5 - j * 0.5,
          rotZ: 0,
        })
      )
    }
  }

  jigsaw.forEach((object) => {
    scene.add(object.model)
    world.addBody(object.body)
  })

  return jigsaw
}
