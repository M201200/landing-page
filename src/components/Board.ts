import { Body, Box, Vec3, World } from "cannon-es"
import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  SRGBColorSpace,
  Scene,
  TextureLoader,
  Vector3,
} from "three"

const params = {
  size: 7,
  depth: 0.05,
  segmentsFront: 40,
  segmentsEdge: 10,
}

export function board(scene: Scene, world: World) {
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

  const position = new Vector3(0, 4, 0)
  const rotation = new Vector3(-Math.PI / 8, 0.7, 0)

  const mesh = new Mesh(BoxGeo, boardMaterial)

  mesh.castShadow = true
  mesh.receiveShadow = true

  mesh.position.copy(position)

  mesh.rotation.set(rotation.x, rotation.y, rotation.z)

  scene.add(mesh)

  const body = new Body({
    mass: 2,
    shape: new Box(
      new Vec3(params.size / 2, params.size / 2, params.depth / 2)
    ),
    position: new Vec3(position.x, position.y, position.z),
    sleepTimeLimit: 1,
  })
  body.allowSleep = true
  body

  world.addBody(body)

  return { mesh, body }
}
