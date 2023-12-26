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
import type { CardTable } from "../../types/3dObjects"

export function cardTable({
  posX = 0,
  posY = -7,
  posZ = 0,
  scale = 2,
} = {}): CardTable {
  const params = {
    topRadius: 1,
    topHeight: 0.04,
    topSegments: 32,
    borderRadialSegments: 13,
    borderTubularSegments: 80,
    legSize: 0.06,
    legHeight: 0.9,
    scale: scale,
  }

  const radius = params.topRadius * params.scale
  const height =
    -7 + (params.legHeight + params.topHeight * 2) * params.scale * 1.01

  const position = new Vector3(
    posX,
    posY + (params.legHeight + params.topHeight) * params.scale,
    posZ
  )
  const rotationY = Math.PI / 4

  const tableTopGeo = new CylinderGeometry(
    params.topRadius,
    params.topRadius,
    params.topHeight,
    params.topSegments
  )
  const tableBorderGeo = new TorusGeometry(
    params.topRadius,
    params.topHeight / 1.25,
    params.borderRadialSegments,
    params.borderTubularSegments
  )
  const tableLegGeo = new BoxGeometry(
    params.legSize,
    params.legHeight,
    params.legSize
  )

  function createTableFrame() {
    return mergeGeometries(
      [
        tableBorderGeo.clone().rotateX(Math.PI / 2),
        tableLegGeo.clone().translate(-params.topRadius, -0.45, 0),
        tableLegGeo.clone().translate(params.topRadius, -0.45, 0),
        tableLegGeo.clone().translate(0, -0.45, params.topRadius),
        tableLegGeo.clone().translate(0, -0.45, -params.topRadius),
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

  return { model, radius, params, height }
}
