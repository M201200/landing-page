import { Body, Cylinder, Material, Sphere, Vec3 } from "cannon-es"
import {
  CylinderGeometry,
  Group,
  Mesh,
  SphereGeometry,
  MeshStandardMaterial,
} from "three"

import type { PhysicalObject } from "../../types/3dObjects"

export function boardGamePiece(
  color = "eeeeee",
  paramsScale = 0.1
): PhysicalObject {
  const params = {
    basisTop: 0.8 * paramsScale,
    basisBottom: 1 * paramsScale,
    basisHeight: 0.6 * paramsScale,
    segments: 36,
    bodyTop: 0.2 * paramsScale,
    bodyBottom: 0.5 * paramsScale,
    bodyHeight: 2 * paramsScale,
    apexRadius: 0.5 * paramsScale,
    apexWidthSegments: 32,
    apexHeightSegments: 24,
  }

  const pieceBasisGeo = new CylinderGeometry(
    params.basisTop,
    params.basisBottom,
    params.basisHeight,
    params.segments,
    1
  )
  const pieceBodyGeo = new CylinderGeometry(
    params.bodyTop,
    params.bodyBottom,
    params.bodyHeight,
    params.segments,
    1
  )
  const pieceApexGeo = new SphereGeometry(
    params.apexRadius,
    params.apexWidthSegments,
    params.apexHeightSegments
  )

  const material = new MeshStandardMaterial({
    color: +`0x${color}`,
    roughness: 0.6,
    metalness: 1,
  })

  const pieceBasisMesh = new Mesh(pieceBasisGeo, material)
  pieceBasisMesh.position.set(0, -params.basisHeight, 0)
  pieceBasisMesh.castShadow = true
  pieceBasisMesh.receiveShadow = true
  const pieceBodyMesh = new Mesh(pieceBodyGeo, material)
  pieceBodyMesh.position.set(0, params.basisHeight, 0)
  pieceBodyMesh.castShadow = true
  pieceBodyMesh.receiveShadow = true
  const pieceApexMesh = new Mesh(pieceApexGeo, material)
  pieceApexMesh.position.set(
    0,
    params.basisHeight + params.basisHeight + params.apexRadius,
    0
  )
  pieceApexMesh.castShadow = true
  pieceApexMesh.receiveShadow = true

  const model = new Group()
  model.add(pieceBasisMesh, pieceBodyMesh, pieceApexMesh)
  model.position.set(0, 3, -3)

  const body = new Body({
    mass: 0.2,
    material: new Material({ restitution: 0 }),
    allowSleep: true,
    sleepTimeLimit: 1,
  })

  body.addShape(
    new Cylinder(
      params.basisTop,
      params.basisBottom,
      params.basisHeight,
      params.segments / 4
    ),
    new Vec3(0, -params.basisHeight, 0)
  )

  body.addShape(
    new Cylinder(
      params.bodyTop,
      params.bodyBottom,
      params.bodyHeight,
      params.segments / 4
    ),
    new Vec3(0, params.basisHeight, 0)
  )
  body.addShape(
    new Sphere(params.apexRadius),
    new Vec3(0, params.basisHeight + params.basisHeight + params.apexRadius, 0)
  )

  body.position.set(model.position.x, model.position.y, model.position.z)
  body.quaternion.set(
    model.quaternion.x,
    model.quaternion.y,
    model.quaternion.z,
    model.quaternion.w
  )

  return { model, body }
}
