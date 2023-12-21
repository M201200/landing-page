import {
  Vector3,
  Mesh,
  CylinderGeometry,
  TorusGeometry,
  BoxGeometry,
  MeshStandardMaterial,
  Group,
} from "three"
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js"

const params = {
  scale: 2,
  tableTopRadius: 1,
  tableTopHeight: 0.04,
  tableTopSegments: 32,
  tableBorderRadialSegments: 13,
  tableBorderTubularSegments: 80,
  tableLegSize: 0.06,
  tableLegHeight: 0.9,
}

export const cardTableRadius = params.tableTopRadius * params.scale

export const cardTableHeight =
  -7 + (params.tableLegHeight + params.tableTopHeight * 2) * params.scale * 1.01

export function cardTable({ posX = 0, posY = -7, posZ = 0 } = {}) {
  const position = new Vector3(
    posX,
    posY + (params.tableLegHeight + params.tableTopHeight) * params.scale,
    posZ
  )
  const rotationY = Math.PI / 4

  const tableTopGeo = new CylinderGeometry(
    params.tableTopRadius,
    params.tableTopRadius,
    params.tableTopHeight,
    params.tableTopSegments
  )
  const tableBorderGeo = new TorusGeometry(
    params.tableTopRadius,
    params.tableTopHeight / 1.25,
    params.tableBorderRadialSegments,
    params.tableBorderTubularSegments
  )
  const tableLegGeo = new BoxGeometry(
    params.tableLegSize,
    params.tableLegHeight,
    params.tableLegSize
  )

  function createTableFrame() {
    return mergeGeometries(
      [
        tableBorderGeo.clone().rotateX(Math.PI / 2),
        tableLegGeo.clone().translate(-params.tableTopRadius, -0.45, 0),
        tableLegGeo.clone().translate(params.tableTopRadius, -0.45, 0),
        tableLegGeo.clone().translate(0, -0.45, params.tableTopRadius),
        tableLegGeo.clone().translate(0, -0.45, -params.tableTopRadius),
        tableBorderGeo
          .clone()
          .rotateX(Math.PI / 2)
          .translate(0, -0.9, 0),
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

  const tableFrame = new Mesh(createTableFrame(), tableMaterial)
  tableFrame.castShadow = true
  tableFrame.receiveShadow = true
  const tableTop = new Mesh(tableTopGeo, tableTopMaterial)

  model.add(tableFrame, tableTop)
  model.scale.set(params.scale, params.scale, params.scale)
  model.position.copy(position)
  model.rotateY(rotationY)

  return model
}
