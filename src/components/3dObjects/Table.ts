import { Body, Box, Cylinder, Material, Vec3 } from "cannon-es"
import {
  Vector3,
  Mesh,
  CylinderGeometry,
  TorusGeometry,
  BoxGeometry,
  MeshStandardMaterial,
  Group,
} from "three"
import type { PhysicalObject } from "../../types/3dObjects"

import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js"

const params = {
  scale: 2,
  tableTopRadius: 1.2,
  tableTopHeight: 0.04,
  tableTopSegments: 32,
  tableBorderRadialSegments: 13,
  tableBorderTubularSegments: 80,
  tableLegSize: 0.06,
  tableLegHeight: 0.9,
}

export const tableHeight =
  -7 +
  (params.tableLegHeight + params.tableTopHeight) * params.scale +
  params.tableTopHeight * params.scale

export function table({ posX = 0, posY = -7, posZ = 0 } = {}): PhysicalObject {
  const position = new Vector3(
    posX,
    posY + (params.tableLegHeight + params.tableTopHeight) * params.scale,
    posZ
  )
  const rotationY = 0.785398

  const tableTop = new CylinderGeometry(
    params.tableTopRadius,
    params.tableTopRadius,
    params.tableTopHeight,
    params.tableTopSegments
  )
  const tableBorder = new TorusGeometry(
    params.tableTopRadius,
    params.tableTopHeight / 1.25,
    params.tableBorderRadialSegments,
    params.tableBorderTubularSegments
  )
  const tableLeg = new BoxGeometry(
    params.tableLegSize,
    params.tableLegHeight,
    params.tableLegSize
  )

  function createTableFrame() {
    return mergeGeometries(
      [
        tableBorder.clone().rotateX(1.5708),
        tableLeg.clone().translate(-1 * params.tableTopRadius, -0.45, 0),
        tableLeg.clone().translate(1 * params.tableTopRadius, -0.45, 0),
        tableLeg.clone().translate(0, -0.45, 1 * params.tableTopRadius),
        tableLeg.clone().translate(0, -0.45, -1 * params.tableTopRadius),
        tableBorder.clone().rotateX(1.5708).translate(0, -0.9, 0),
      ],
      false
    )
  }

  const tableTopMaterial = new MeshStandardMaterial({
    color: 15199742,
    opacity: 0.5,
    roughness: 0,
    transparent: true,
  })

  const tableMaterial = new MeshStandardMaterial({
    color: 3289650,
    roughness: 0.2,
    metalness: 1,
  })

  const model = new Group()

  const tableFrameMesh = new Mesh(createTableFrame(), tableMaterial)
  tableFrameMesh.castShadow = true
  tableFrameMesh.receiveShadow = true
  const tableTopMesh = new Mesh(tableTop, tableTopMaterial)

  model.add(tableFrameMesh, tableTopMesh)
  model.scale.set(params.scale, params.scale, params.scale)
  model.position.copy(position)
  model.rotateY(rotationY)

  const body = new Body({
    type: Body.STATIC,
    material: new Material({ restitution: 0, friction: 0.8 }),
    shape: new Cylinder(
      (params.tableTopRadius + 0.02) * params.scale,
      (params.tableTopRadius + 0.02) * params.scale,
      (params.tableTopHeight + 0.025) * params.scale,
      params.tableTopSegments
    ),
    position: new Vec3(position.x, position.y, position.z),
  })
  body.addShape(
    new Cylinder(
      (params.tableTopRadius + 0.02) * params.scale,
      (params.tableTopRadius + 0.02) * params.scale,
      (params.tableTopHeight + 0.025) * params.scale,
      params.tableTopSegments
    ),
    new Vec3(
      0,
      -(params.tableLegHeight + params.tableTopHeight - 0.04) * params.scale,
      0
    )
  )
  body.addShape(
    new Box(
      new Vec3(
        (params.tableLegSize * params.scale) / 2,
        (params.tableLegHeight * params.scale) / 2,
        (params.tableLegSize * params.scale) / 2
      )
    ),
    new Vec3(
      1 * params.scale * params.tableTopRadius,
      (-(params.tableLegHeight + params.tableTopHeight) * params.scale) / 2,
      0
    )
  )
  body.addShape(
    new Box(
      new Vec3(
        (params.tableLegSize * params.scale) / 2,
        (params.tableLegHeight * params.scale) / 2,
        (params.tableLegSize * params.scale) / 2
      )
    ),
    new Vec3(
      -1 * params.scale * params.tableTopRadius,
      (-(params.tableLegHeight + params.tableTopHeight) * params.scale) / 2,
      0
    )
  )
  body.addShape(
    new Box(
      new Vec3(
        (params.tableLegSize * params.scale) / 2,
        (params.tableLegHeight * params.scale) / 2,
        (params.tableLegSize * params.scale) / 2
      )
    ),
    new Vec3(
      0,
      (-(params.tableLegHeight + params.tableTopHeight) * params.scale) / 2,
      1 * params.scale * params.tableTopRadius
    )
  )
  body.addShape(
    new Box(
      new Vec3(
        (params.tableLegSize * params.scale) / 2,
        (params.tableLegHeight * params.scale) / 2,
        (params.tableLegSize * params.scale) / 2
      )
    ),
    new Vec3(
      0,
      (-(params.tableLegHeight + params.tableTopHeight) * params.scale) / 2,
      -1 * params.scale * params.tableTopRadius
    )
  )

  body.quaternion.setFromEuler(0, rotationY, 0)

  return { model, body }
}
;``
