import { Group, Mesh, MeshPhongMaterial, MeshStandardMaterial } from "three"
import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import type { JigsawTable } from "../../types/3dObjects"

type JigsawTableProps = {
  posX?: number
  posY?: number
  posZ?: number
  rotX?: number
  rotY?: number
  rotZ?: number
  scale?: number
}

export function jigsawTable({
  posX = 0,
  posY = -7,
  posZ = 0,
  rotX = 0,
  rotY = 0,
  rotZ = 0,
  scale = 1,
}: JigsawTableProps = {}): JigsawTable {
  const params = {
    topWidth: 2,
    topHeight: 1,
    topDepth: 0.05,
    topRadius: 0.4,
    legSize: 0.08,
    legHeight: 0.5,
    legRadius: 0.6,
    scale: scale,
  }

  const height = (params.topDepth / 2 + params.legHeight) * scale + posY

  const tableTopGeo = new RoundedBoxGeometry(
    params.topWidth,
    params.topHeight,
    params.topDepth,
    1,
    params.topRadius
  )
  tableTopGeo.rotateX(Math.PI / 2).translate(0, params.legHeight, 0)

  const tableLegGeo = new RoundedBoxGeometry(
    params.legSize,
    params.legHeight,
    params.legSize,
    1,
    params.legRadius
  )

  const tableTopSurfaceMaterial = new MeshPhongMaterial({
    color: 15199742,
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
        .rotateX(-Math.PI / 6)
        .rotateZ(-Math.PI / 6)
        .translate(
          -params.topWidth * 0.4,
          params.legHeight * 0.6,
          params.topHeight * 0.4
        ),
      tableLegGeo
        .clone()
        .rotateX(-Math.PI / 6)
        .rotateZ(Math.PI / 6)
        .translate(
          params.topWidth * 0.4,
          params.legHeight * 0.6,
          params.topHeight * 0.4
        ),
      tableLegGeo
        .clone()
        .rotateX(Math.PI / 6)
        .rotateZ(Math.PI / 6)
        .translate(
          params.topWidth * 0.4,
          params.legHeight * 0.6,
          -params.topHeight * 0.4
        ),
      tableLegGeo
        .clone()
        .rotateX(Math.PI / 6)
        .rotateZ(-Math.PI / 6)
        .translate(
          -params.topWidth * 0.4,
          params.legHeight * 0.6,
          -params.topHeight * 0.4
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

  return { model, params, height }
}
