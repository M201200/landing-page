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

export const pieceSize = 1 // DO NOT TOUCH! Values other than 1 will broke texture offset!
export const pieceDepth = pieceSize * 0.001
export const pieceOffset = pieceSize * 0.25

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
  const upperRecess: Path =
    corner || side || oppositeSide
      ? [0, 0, 0, 0, 0, 0]
      : [
          -pieceOffset,
          -pieceOffset * 0.05,
          pieceOffset * 0.85,
          pieceSize * 0.25,
          0,
          3.14159,
          true,
        ]

  const sideRecess: Path = corner
    ? [0, 0, 0, 0, 0, 0]
    : [
        pieceOffset * 0.05,
        -pieceOffset,
        pieceSize * 0.25,
        pieceOffset * 0.85,
        1.5708,
        -1.5708,
        true,
      ]

  const bottomNotch: Path =
    corner || oppositeSide
      ? [
          pieceOffset,
          pieceOffset * 0.05,
          pieceOffset * 0.85,
          pieceSize * 0.25,
          3.14159,
          0,
          true,
        ]
      : [
          pieceOffset,
          -pieceOffset * 0.05,
          pieceOffset * 0.85,
          pieceSize * 0.25,
          3.14159,
          0,
          false,
        ]

  const puzzleShape = new Shape()
    .moveTo(0, 0)
    .lineTo(pieceSize * 0.5 - pieceOffset, 0)
    .ellipse(...bottomNotch)
    .lineTo(pieceSize * 0.5 + pieceOffset, 0)
    .lineTo(pieceSize, 0)
    .lineTo(pieceSize, pieceSize * 0.5 - pieceOffset)
    .ellipse(
      pieceOffset * 0.05,
      pieceOffset,
      pieceSize * 0.25,
      pieceOffset * 0.85,
      -1.5708,
      1.5708,
      false
    )
    .lineTo(pieceSize, pieceSize * 0.5 + pieceOffset)
    .lineTo(pieceSize, pieceSize)
    .lineTo(pieceSize * 0.5 + pieceOffset, pieceSize)
    .ellipse(...upperRecess)
    .lineTo(pieceSize * 0.5 - pieceOffset, pieceSize)
    .lineTo(0, pieceSize)
    .lineTo(0, pieceSize * 0.5 + pieceOffset)
    .ellipse(...sideRecess)
    .lineTo(0, pieceSize * 0.5 - pieceOffset)
    .lineTo(0, 0)

  const geometry = new ExtrudeGeometry(puzzleShape, {
    curveSegments: 24,
    depth: pieceDepth,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: pieceSize * 0.004,
    bevelThickness: pieceSize * 0.024,
  })

  geometry.translate(-0.5 * pieceSize, -0.5 * pieceSize, 0 * pieceSize)

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

  return { model, column, row }
}
