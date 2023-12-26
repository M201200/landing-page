import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  SRGBColorSpace,
  TextureLoader,
} from "three"

import { Body, Box, Material, Vec3 } from "cannon-es"
import type { Board } from "../../types/3dObjects"

export function board({
  posX = 0,
  posY = 1,
  posZ = 0,
  size = 3,
  depth = 0.05,
} = {}): Board {
  const textureLoader = new TextureLoader()

  const BoxGeo = new BoxGeometry(size, size, depth, 1, 1, 1)

  const texture = textureLoader.load("./assets/game-min.jpg")
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
    shape: new Box(new Vec3(size / 2, size / 2, depth / 2)),
    allowSleep: true,
  })

  body.position.set(posX, posY, posZ)
  body.quaternion.set(
    model.quaternion.x,
    model.quaternion.y,
    model.quaternion.z,
    model.quaternion.w
  )
  body.sleep()

  const zeroX = body.position.x - size / 2
  const zeroZ = body.position.z + size / 2

  const path = [
    { x: zeroX + size * 0.1, z: zeroZ - size * 0.49 },
    { x: zeroX + size * 0.1, z: zeroZ - size * 0.55 },
    { x: zeroX + size * 0.09, z: zeroZ - size * 0.59 },
    { x: zeroX + size * 0.08, z: zeroZ - size * 0.65 },
    { x: zeroX + size * 0.09, z: zeroZ - size * 0.7 },
    { x: zeroX + size * 0.1, z: zeroZ - size * 0.75 },
    { x: zeroX + size * 0.11, z: zeroZ - size * 0.8 },
  ]

  return { model, body, size, depth, path }
}
