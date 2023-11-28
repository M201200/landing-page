import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
  Group,
} from "three"

import { Body, Box, Quaternion, Vec3 } from "cannon-es"

type PhysicalObject = {
  model: Group | Mesh
  body: Body
}

const params = {
  size: 7,
  depth: 0.05,
  segmentsFront: 40,
  segmentsEdge: 10,
}

export function board(): PhysicalObject {
  const textureLoader = new TextureLoader()

  const BoxGeo = new BoxGeometry(
    params.size,
    params.size,
    params.depth,
    params.segmentsFront,
    params.segmentsFront,
    params.segmentsEdge
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
    mass: 2,
    shape: new Box(
      new Vec3(params.size / 2, params.size / 2, params.depth / 2)
    ),
    position: new Vec3(model.position.x, model.position.y, model.position.z),
    quaternion: new Quaternion(
      model.quaternion.x,
      model.quaternion.y,
      model.quaternion.z,
      model.quaternion.w
    ),
    sleepTimeLimit: 1,
  })
  body.allowSleep = true
  body

  return { model, body }
}
