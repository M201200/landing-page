import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js"
import {
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

type GameCard = {
  facePath: string
  posX?: number
  posY?: number
  posZ?: number
  rotX?: number
  rotY?: number
  rotZ?: number
}

const params = {
  width: 0.5,
  height: 0.75,
  depth: 0.014,
  segments: 1,
  radius: 0.4,
}

const textureLoader = new TextureLoader()

export function gameCard({
  facePath,
  posX = 0,
  posY = 1,
  posZ = 0,
  rotX = -1.5708,
  rotY = 0,
  rotZ = 0,
}: GameCard): PhysicalObject {
  const position = new Vector3(posX, posY, posZ)
  const rotation = new Vector3(rotX, rotY, rotZ)
  const CardGeo = new RoundedBoxGeometry(
    params.width,
    params.height,
    params.depth,
    params.segments,
    params.radius
  )
  const face = textureLoader.load(facePath)
  face.colorSpace = SRGBColorSpace
  const backdrop = textureLoader.load("./public/images/cards/card-backdrop.jpg")
  backdrop.colorSpace = SRGBColorSpace

  const CardMaterial = [
    new MeshStandardMaterial({ color: 0xeeeeee }),
    new MeshStandardMaterial({ color: 0xeeeeee }),
    new MeshStandardMaterial({ color: 0xeeeeee }),
    new MeshStandardMaterial({ color: 0xeeeeee }),
    new MeshStandardMaterial({
      map: face,
      lightMap: face,
    }),
    new MeshStandardMaterial({
      map: backdrop,
      lightMap: backdrop,
    }),
  ]

  const model = new Mesh(CardGeo, CardMaterial)

  model.castShadow = true
  model.receiveShadow = true

  model.position.copy(position)

  model.rotation.set(rotation.x, rotation.y, rotation.z)

  const body = new Body({
    mass: 1,
    shape: new Box(
      new Vec3(params.width / 2, params.height / 2, params.depth / 2)
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
