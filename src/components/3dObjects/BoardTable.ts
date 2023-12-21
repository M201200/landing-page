import { Body, Box, Cylinder, Material, Vec3 } from "cannon-es"
import { CylinderGeometry, Group, Mesh, MeshStandardMaterial } from "three"
import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import type { PhysicalObject } from "../../types/3dObjects"

type BoardTableProps = {
  posX?: number
  posY?: number
  posZ?: number
  rotX?: number
  rotY?: number
  rotZ?: number
  scale?: number
}

const params = {
  tableTopRadiusTop: 1,
  tableTopRadiusBottom: 0.8,
  tableTopDepth: 0.05,
  tableTopSegments: 6,
  tableLegSize: 0.08,
  tableLegHeight: 0.5,
  tableLegRadius: 0.01,
}

export let boardTableHeight: number

export function boardTable({
  posX = 0,
  posY = -7,
  posZ = 0,
  rotX = 0,
  rotY = 0,
  rotZ = 0,
  scale = 1,
}: BoardTableProps = {}): PhysicalObject {
  boardTableHeight =
    (params.tableTopDepth + params.tableLegHeight) * scale + posY
  const tableTopGeo = new CylinderGeometry(
    params.tableTopRadiusTop,
    params.tableTopRadiusBottom,
    params.tableTopDepth,
    params.tableTopSegments,
    1
  )
  tableTopGeo.rotateY(Math.PI / 2)
  tableTopGeo.translate(0, params.tableTopDepth * 0.5, 0)

  const tableLegGeo = new RoundedBoxGeometry(
    params.tableLegSize,
    params.tableLegHeight,
    params.tableLegSize,
    1,
    params.tableLegRadius
  )

  tableTopGeo.translate(0, params.tableLegHeight, 0)
  const tableTopSurfaceMaterial = new MeshStandardMaterial({
    color: 15199742,
    metalness: 1,
    roughness: 0.6,
  })
  const tableTopSideMaterial = new MeshStandardMaterial({
    color: 15199742,
    metalness: 1,
    roughness: 0.6,
  })

  const tableLegMaterial = new MeshStandardMaterial({
    color: 15199742,
    metalness: 1,
    roughness: 0,
  })

  const tableTop = new Mesh(tableTopGeo, [
    tableTopSideMaterial,
    tableTopSideMaterial,
    tableTopSideMaterial,
    tableTopSideMaterial,
    tableTopSurfaceMaterial,
    tableTopSurfaceMaterial,
  ])

  tableTop.receiveShadow = true
  tableTop.castShadow = true

  const tableLegs = new Mesh(
    mergeGeometries([
      tableLegGeo
        .clone()
        .translate(
          -params.tableTopRadiusBottom * 0.35,
          params.tableLegHeight * 0.5,
          params.tableTopRadiusBottom * 0.35
        ),
      tableLegGeo
        .clone()
        .translate(
          params.tableTopRadiusBottom * 0.35,
          params.tableLegHeight * 0.5,
          params.tableTopRadiusBottom * 0.35
        ),
      tableLegGeo
        .clone()
        .translate(
          params.tableTopRadiusBottom * 0.35,
          params.tableLegHeight * 0.5,
          -params.tableTopRadiusBottom * 0.35
        ),
      tableLegGeo
        .clone()
        .translate(
          -params.tableTopRadiusBottom * 0.35,
          params.tableLegHeight * 0.5,
          -params.tableTopRadiusBottom * 0.35
        ),
    ]),
    tableLegMaterial
  )

  tableLegs.receiveShadow = true
  tableLegs.castShadow = true

  const model = new Group()
  model.add(tableTop, tableLegs)

  model.position.set(posX, posY, posZ)
  model.rotation.set(rotX, rotY, rotZ)
  model.scale.set(scale, scale, scale)

  const body = new Body({
    type: Body.STATIC,
    material: new Material({ restitution: 0.2, friction: 0.8 }),
    position: new Vec3(model.position.x, model.position.y, model.position.z),
  })

  body.addShape(
    new Cylinder(
      params.tableTopRadiusTop * scale,
      params.tableTopRadiusBottom * scale,
      params.tableTopDepth * scale,
      params.tableTopSegments
    ),
    new Vec3(0, params.tableLegHeight * scale + params.tableLegHeight * 0.12, 0)
  )

  body.quaternion.setFromEuler(0, Math.PI / 2, 0)

  body.position.set(model.position.x, model.position.y, model.position.z)

  return { model, body }
}
