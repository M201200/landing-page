import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
} from "three"

import { Body, Box, Material, Quaternion, Vec3 } from "cannon-es"

import type { PhysicalObject } from "../../types/3dObjects"

export const boardParams = {
  size: 7,
  depth: 0.05,
  segmentsFront: 1,
  segmentsEdge: 1,
}

export function board(): PhysicalObject {
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

  const position = new Vector3(0, 1, 0)
  const rotation = new Vector3(-Math.PI / 2, 0, 0)

  const model = new Mesh(BoxGeo, boardMaterial)

  model.castShadow = true
  model.receiveShadow = true

  model.position.copy(position)

  model.rotation.set(rotation.x, rotation.y, rotation.z)

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
