import {
  Group,
  MeshStandardMaterial,
  Mesh,
  Shape,
  ExtrudeGeometry,
  Texture,
} from "three"
import type { JigsawPiece } from "../../types/3dObjects"

type PuzzlePiece = {
  column?: number
  row?: number
  texture?: Texture
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

export function puzzlePiece({
  column = 0,
  row = 0,
  texture,
  corner = false,
  side = false,
  oppositeSide = false,
  scale = 1, // Change scale if you want to change piece size.
  posX = 0,
  posY = 0,
  posZ = 0,
  rotX = -Math.PI / 2,
  rotY = 0,
  rotZ = 0,
}: PuzzlePiece = {}): JigsawPiece {
  const params = {
    size: 1, // DO NOT TOUCH! Values other than 1 will broke texture offset!
    depth: 0.001,
    offset: 0.25,
    scale: scale,
  }
  const upperRecess: Path =
    corner || side || oppositeSide
      ? [0, 0, 0, 0, 0, 0]
      : [
          -params.offset,
          -params.offset * 0.05,
          params.offset * 0.85,
          params.size * 0.25,
          0,
          Math.PI,
          true,
        ]

  const sideRecess: Path = corner
    ? [0, 0, 0, 0, 0, 0]
    : [
        params.offset * 0.05,
        -params.offset,
        params.size * 0.25,
        params.offset * 0.85,
        Math.PI / 2,
        -Math.PI / 2,
        true,
      ]

  const bottomNotch: Path =
    corner || oppositeSide
      ? [
          params.offset,
          params.offset * 0.05,
          params.offset * 0.85,
          params.size * 0.25,
          Math.PI,
          0,
          true,
        ]
      : [
          params.offset,
          -params.offset * 0.05,
          params.offset * 0.85,
          params.size * 0.25,
          Math.PI,
          0,
          false,
        ]

  const puzzleShape = new Shape()
    .moveTo(0, 0)
    .lineTo(params.size * 0.5 - params.offset, 0)
    .ellipse(...bottomNotch)
    .lineTo(params.size * 0.5 + params.offset, 0)
    .lineTo(params.size, 0)
    .lineTo(params.size, params.size * 0.5 - params.offset)
    .ellipse(
      params.offset * 0.05,
      params.offset,
      params.size * 0.25,
      params.offset * 0.85,
      -1.5708,
      1.5708,
      false
    )
    .lineTo(params.size, params.size * 0.5 + params.offset)
    .lineTo(params.size, params.size)
    .lineTo(params.size * 0.5 + params.offset, params.size)
    .ellipse(...upperRecess)
    .lineTo(params.size * 0.5 - params.offset, params.size)
    .lineTo(0, params.size)
    .lineTo(0, params.size * 0.5 + params.offset)
    .ellipse(...sideRecess)
    .lineTo(0, params.size * 0.5 - params.offset)
    .lineTo(0, 0)

  const geometry = new ExtrudeGeometry(puzzleShape, {
    curveSegments: 24,
    depth: params.depth,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: params.size * 0.004,
    bevelThickness: params.size * 0.024,
  })

  geometry.translate(-0.5 * params.size, -0.5 * params.size, 0 * params.size)

  const material = [
    texture
      ? new MeshStandardMaterial({
          map: texture,
          lightMap: texture,
        })
      : new MeshStandardMaterial({ color: 0xeeeeee }),
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

  return { model, column, row, params }
}
