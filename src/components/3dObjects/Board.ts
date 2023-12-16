import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  SRGBColorSpace,
  TextureLoader,
} from "three"

import { Body, Box, Material, Quaternion, Vec3 } from "cannon-es"

import type { PhysicalObject } from "../../types/3dObjects"

export const boardParams = {
  size: 3,
  depth: 0.05,
  segmentsFront: 1,
  segmentsEdge: 1,
}

export function board({ posX = 0, posY = 1, posZ = 0 } = {}): PhysicalObject {
  const textureLoader = new TextureLoader()

  const BoxGeo = new BoxGeometry(
    boardParams.size,
    boardParams.size,
    boardParams.depth,
    boardParams.segmentsFront,
    boardParams.segmentsFront,
    boardParams.segmentsEdge
  )

  const texture = textureLoader.load("./public/assets/game-min.jpg")
  texture.colorSpace = SRGBColorSpace

  const boardMaterial = [
    new MeshStandardMaterial({ color: 0xeeeeee }),
    new MeshStandardMaterial({ color: 0xeeeeee }),
    new MeshStandardMaterial({ color: 0xeeeeee }),
    new MeshStandardMaterial({ color: 0xeeeeee }),
    new MeshStandardMaterial({
      map: texture,
      lightMap: texture,
    }),
    new MeshStandardMaterial({ color: 0xeeeeee }),
  ]

  const model = new Mesh(BoxGeo, boardMaterial)

  model.castShadow = true
  model.receiveShadow = true

  model.position.set(posX, posY, posZ)

  model.rotation.set(-Math.PI / 2, 0, 0)

  const body = new Body({
    mass: 5,
    material: new Material({ restitution: 0 }),
    shape: new Box(
      new Vec3(
        boardParams.size / 2,
        boardParams.size / 2,
        boardParams.depth / 2
      )
    ),
    position: new Vec3(model.position.x, model.position.y, model.position.z),
    quaternion: new Quaternion(
      model.quaternion.x,
      model.quaternion.y,
      model.quaternion.z,
      model.quaternion.w
    ),
    sleepTimeLimit: 0.2,
  })
  body.allowSleep = true
  body.sleep()

  return { model, body }
}
