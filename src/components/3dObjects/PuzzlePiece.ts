import { Body, Box, Cylinder, Quaternion, Vec3 } from "cannon-es"
import {
  Group,
  MeshStandardMaterial,
  Mesh,
  Shape,
  ExtrudeGeometry,
  Texture,
} from "three"

type PuzzlePiece = {
  texture: Texture
  corner?: boolean
  side?: boolean
  oppositeSide?: boolean
  scale?: number
  posX?: number
  posY?: number
  posZ?: number
  rotX?: number
  rotY?: number
  rotZ?: number
}

type Path = [number, number, number, number, number, number, boolean?, number?]

type PhysicalObject = {
  model: Group | Mesh
  body: Body
}

export function puzzlePiece({
  texture,
  corner = false,
  side = false,
  oppositeSide = false,
  scale = 1, // Change scale if you want to change piece size.
  posX = 0,
  posY = 0,
  posZ = 0,
  rotX = -1.5708,
  rotY = 0,
  rotZ = 0,
}: PuzzlePiece): PhysicalObject {
  const size = 1 // DO NOT TOUCH! Values other than 1 will broke texture offset!
  const depth = size * 0.001
  const offset = size * 0.25

  const upperRecess: Path =
    corner || side || oppositeSide
      ? [0, 0, 0, 0, 0, 0]
      : [-offset, -offset * 0.05, offset * 0.85, size * 0.25, 0, 3.14159, true]

  const sideRecess: Path = corner
    ? [0, 0, 0, 0, 0, 0]
    : [
        offset * 0.05,
        -offset,
        size * 0.25,
        offset * 0.85,
        1.5708,
        -1.5708,
        true,
      ]

  const bottomNotch: Path =
    corner || oppositeSide
      ? [offset, offset * 0.05, offset * 0.85, size * 0.25, 3.14159, 0, true]
      : [offset, -offset * 0.05, offset * 0.85, size * 0.25, 3.14159, 0, false]

  const puzzleShape = new Shape()
    .moveTo(0, 0)
    .lineTo(size * 0.5 - offset, 0)
    .ellipse(...bottomNotch)
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
    .ellipse(...upperRecess)
    .lineTo(size * 0.5 - offset, size)
    .lineTo(0, size)
    .lineTo(0, size * 0.5 + offset)
    .ellipse(...sideRecess)
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

  const model = new Group()
  model.add(mesh, bottomMesh)

  model.position.set(posX, posY, posZ)
  model.rotation.set(rotX, rotY, rotZ)
  model.scale.set(scale, scale, scale)

  model.receiveShadow = true

  const body = new Body({
    mass: 1,
    allowSleep: true,
    sleepTimeLimit: 1,
  })

  function addBox({
    sizeX,
    sizeY,
    posX,
    posY,
  }: {
    sizeX: number
    sizeY: number
    posX: number
    posY: number
  }) {
    return body.addShape(
      new Box(
        new Vec3(
          (size * scale) / sizeX,
          (size * scale) / sizeY,
          depth * scale * 25
        )
      ),
      new Vec3(posX * size * scale, posY * size * scale, 0)
    )
  }

  function addCylinder({ posX, posY }: { posX: number; posY: number }) {
    return body.addShape(
      new Cylinder(
        0.208 * size * scale,
        0.208 * size * scale,
        depth * scale * 50,
        20
      ),
      new Vec3(posX * size * scale, posY * size * scale, 0),
      new Quaternion(0.7071, 0, 0, 0.7071)
    )
  }

  addCylinder({ posX: 0.554, posY: 0 })

  if (!corner && !side && !oppositeSide) {
    addBox({ sizeX: 2.7, sizeY: 2.7, posX: 0.13, posY: -0.13 })
    addBox({ sizeX: 7, sizeY: 7, posX: -0.36, posY: 0.36 })
    addBox({ sizeX: 7, sizeY: 7, posX: -0.36, posY: -0.36 })
    addBox({ sizeX: 7, sizeY: 7, posX: 0.36, posY: 0.36 })
    addCylinder({ posX: 0, posY: -0.554 })
  }

  if (side) {
    addBox({ sizeX: 2.7, sizeY: 2, posX: 0.13, posY: 0 })
    addBox({ sizeX: 7, sizeY: 7, posX: -0.36, posY: -0.36 })
    addBox({ sizeX: 7, sizeY: 7, posX: -0.36, posY: 0.36 })
    addCylinder({ posX: 0, posY: -0.554 })
  }
  if (oppositeSide) {
    addBox({ sizeX: 2.7, sizeY: 2.7, posX: 0.13, posY: 0.13 })
    addBox({ sizeX: 7, sizeY: 7, posX: -0.36, posY: -0.36 })
    addBox({ sizeX: 7, sizeY: 7, posX: -0.36, posY: 0.36 })
    addBox({ sizeX: 7, sizeY: 7, posX: 0.36, posY: -0.36 })
  }

  if (corner) {
    addBox({ sizeX: 2, sizeY: 2.7, posX: 0, posY: 0.13 })
    addBox({ sizeX: 7, sizeY: 7, posX: 0.36, posY: -0.36 })
    addBox({ sizeX: 7, sizeY: 7, posX: -0.36, posY: -0.36 })
  }

  body.position.set(model.position.x, model.position.y, model.position.z)
  body.quaternion.set(
    model.quaternion.x,
    model.quaternion.y,
    model.quaternion.z,
    model.quaternion.w
  )

  return { model, body }
}
