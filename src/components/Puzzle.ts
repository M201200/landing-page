import { Body, Box, Cylinder, Quaternion, Vec3, type World } from "cannon-es"
import {
  type Scene,
  TextureLoader,
  Group,
  MeshStandardMaterial,
  Mesh,
  Shape,
  ExtrudeGeometry,
  SRGBColorSpace,
  RepeatWrapping,
} from "three"

type PhysicalObject = {
  mesh: Group
  body: Body
}

export function puzzlePiece(scene: Scene, world: World) {
  let puzzle: PhysicalObject[] = []
  const textureLoader = new TextureLoader()

  const texture = textureLoader.load("/public/images/nature.jpg")
  texture.colorSpace = SRGBColorSpace
  texture.wrapS = texture.wrapT = RepeatWrapping
  texture.repeat.set(1, 1)

  texture.offset.set(0, 0)

  const model = new Group()

  const position = {
    x: 0,
    y: 1,
    z: 0,
  }

  const size = 1
  const modelScale = 1
  const depth = size * 0.001
  const offset = size * 0.25
  const puzzleShape = new Shape()
    .moveTo(0, 0)
    .lineTo(size * 0.5 - offset, 0)
    .ellipse(
      offset,
      offset * 0.05,
      offset * 0.85,
      size * 0.25,
      3.14159,
      0,
      true
    )
    .lineTo(size * 0.5 + offset, 0)
    .lineTo(size, 0)
    .lineTo(size, size * 0.5 - offset)
    .ellipse(
      offset * 0.05,
      offset,
      size * 0.25,
      offset * 0.85,
      -1.5708,
      1.5708,
      false
    )
    .lineTo(size, size * 0.5 + offset)
    .lineTo(size, size)
    .lineTo(size * 0.5 + offset, size)
    .ellipse(
      -offset,
      offset * 0.05,
      offset * 0.85,
      size * 0.25,
      0,
      3.14159,
      false
    )
    .lineTo(size * 0.5 - offset, size)
    .lineTo(0, size)
    .lineTo(0, size * 0.5 + offset)
    .ellipse(
      offset * 0.05,
      -offset,
      size * 0.25,
      offset * 0.85,
      1.5708,
      -1.5708,
      true
    )
    .lineTo(0, size * 0.5 - offset)
    .lineTo(0, 0)

  const geometry = new ExtrudeGeometry(puzzleShape, {
    curveSegments: 24,
    depth: depth,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: size * 0.004,
    bevelThickness: size * 0.024,
  })

  geometry.translate(-0.5 * size, -0.5 * size, 0 * size)

  const material = [
    new MeshStandardMaterial({
      map: texture,
      lightMap: texture,
    }),
    new MeshStandardMaterial({ color: 0xeeeeee }),
    new MeshStandardMaterial({ color: 0xeeeeee }),
  ]

  const mesh = new Mesh(geometry, material)
  mesh.castShadow = true

  const bottomMesh = mesh.clone()
  bottomMesh.material[0] = new MeshStandardMaterial({ color: 0xeeeeee })
  bottomMesh.position.set(
    mesh.position.x,
    mesh.position.y,
    mesh.position.z - 0.001
  )

  model.add(mesh, bottomMesh)

  model.position.set(position.x, position.y, position.z)
  model.scale.set(modelScale, modelScale, modelScale)

  scene.add(model)

  model.receiveShadow = true

  const body = new Body({
    mass: 1,
    allowSleep: true,
    sleepTimeLimit: 1,
  })
  body.addShape(
    new Box(
      new Vec3(
        (size * modelScale) / 2.7,
        (size * modelScale) / 2.7,
        depth * modelScale * 25
      )
    ),
    new Vec3(0.13 * size * modelScale, 0.13 * size * modelScale, 0)
  )

  body.addShape(
    new Box(
      new Vec3(
        (size * modelScale) / 7,
        (size * modelScale) / 7,
        depth * modelScale * 25
      )
    ),
    new Vec3(-0.36 * size * modelScale, 0.36 * size * modelScale, 0)
  )

  body.addShape(
    new Box(
      new Vec3(
        (size * modelScale) / 7,
        (size * modelScale) / 7,
        depth * modelScale * 25
      )
    ),
    new Vec3(-0.36 * size * modelScale, -0.36 * size * modelScale, 0)
  )

  body.addShape(
    new Box(
      new Vec3(
        (size * modelScale) / 7,
        (size * modelScale) / 7,
        depth * modelScale * 25
      )
    ),
    new Vec3(0.36 * size * modelScale, -0.36 * size * modelScale, 0)
  )

  body.addShape(
    new Cylinder(
      0.208 * size * modelScale,
      0.208 * size * modelScale,
      depth * modelScale * 50,
      20
    ),
    new Vec3(0.554 * size * modelScale, 0 * size * modelScale, 0),
    new Quaternion(0.7071, 0, 0, 0.7071)
  )

  body.addShape(
    new Cylinder(
      0.208 * size * modelScale,
      0.208 * size * modelScale,
      depth * modelScale * 50,
      20
    ),
    new Vec3(0 * size * modelScale, 0.554 * size * modelScale, 0),
    new Quaternion(0.7071, 0, 0, 0.7071)
  )

  world.addBody(body)

  return { model, body }
}
