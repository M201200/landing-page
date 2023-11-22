import { Body, Box, Vec3, type World } from "cannon-es"
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
  // texture.repeat.set(0.0432, 0.064)
  texture.repeat.set(1, 1)

  texture.offset.set(0, 0)

  const model = new Group()
  const boxSize = 1
  const offset = boxSize * 0.25
  const puzzleShape = new Shape()
    .moveTo(0, 0)
    .lineTo(boxSize * 0.5 - offset, 0)
    .ellipse(
      offset,
      offset * 0.05,
      offset * 0.85,
      boxSize * 0.25,
      3.14159,
      0,
      true
    )
    .lineTo(boxSize * 0.5 + offset, 0)
    .lineTo(boxSize, 0)
    .lineTo(boxSize, boxSize * 0.5 - offset)
    .ellipse(
      offset * 0.05,
      offset,
      boxSize * 0.25,
      offset * 0.85,
      -1.5708,
      1.5708,
      false
    )
    .lineTo(boxSize, boxSize * 0.5 + offset)
    .lineTo(boxSize, boxSize)
    .lineTo(boxSize * 0.5 + offset, boxSize)
    .ellipse(
      -offset,
      offset * 0.05,
      offset * 0.85,
      boxSize * 0.25,
      0,
      3.14159,
      false
    )
    .lineTo(boxSize * 0.5 - offset, boxSize)
    .lineTo(0, boxSize)
    .lineTo(0, boxSize * 0.5 + offset)
    .ellipse(
      offset * 0.05,
      -offset,
      boxSize * 0.25,
      offset * 0.85,
      1.5708,
      -1.5708,
      true
    )
    .lineTo(0, boxSize * 0.5 - offset)
    .lineTo(0, 0)

  const geometry = new ExtrudeGeometry(puzzleShape, {
    curveSegments: 24,
    depth: boxSize * 0.001,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.004,
    bevelThickness: 0.024,
  })

  const material = [
    new MeshStandardMaterial({
      map: texture,
      lightMap: texture,
    }),
    new MeshStandardMaterial({ color: 0xeeeeee }),
    new MeshStandardMaterial({ color: 0xeeeeee }),
  ]

  const mesh = new Mesh(geometry, material)

  const bottomMesh = mesh.clone()
  bottomMesh.material[0] = new MeshStandardMaterial({ color: 0xeeeeee })
  bottomMesh.position.set(0, 0, -0.001)

  model.add(mesh, bottomMesh)
  const modelScale = 0.5
  model.scale.set(modelScale, modelScale, modelScale)
  scene.add(model)

  model.castShadow = true
  model.receiveShadow = true

  const body = new Body({
    mass: 1,
    shape: new Box(
      new Vec3(
        (boxSize * modelScale) / 2,
        (boxSize * modelScale) / 2,
        boxSize * 0.01
      )
    ),
    position: new Vec3(0, 0, 0),
  })

  body.velocity.set(3, 3, 0)
  world.addBody(body)

  return { model, body }
}
