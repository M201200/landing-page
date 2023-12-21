import { Group, Mesh, MeshPhongMaterial, MeshStandardMaterial } from "three"
import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"

type JigsawTableProps = {
  posX?: number
  posY?: number
  posZ?: number
  rotX?: number
  rotY?: number
  rotZ?: number
  scale?: number
}

const params = {
  tableTopWidth: 2,
  tableTopHeight: 1,
  tableTopDepth: 0.05,
  tableTopRadius: 0.4,
  tableLegSize: 0.08,
  tableLegHeight: 0.5,
  tableLegRadius: 0.6,
}

export let jigsawTableHeight: number

export function jigsawTable({
  posX = 0,
  posY = -7,
  posZ = 0,
  rotX = 0,
  rotY = 0,
  rotZ = 0,
  scale = 1,
}: JigsawTableProps = {}) {
  jigsawTableHeight =
    (params.tableTopDepth / 2 + params.tableLegHeight) * scale + posY
  const tableTopGeo = new RoundedBoxGeometry(
    params.tableTopWidth,
    params.tableTopHeight,
    params.tableTopDepth,
    1,
    params.tableTopRadius
  )
  tableTopGeo.rotateX(Math.PI / 2).translate(0, params.tableLegHeight, 0)

  const tableLegGeo = new RoundedBoxGeometry(
    params.tableLegSize,
    params.tableLegHeight,
    params.tableLegSize,
    1,
    params.tableLegRadius
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
          -params.tableTopWidth * 0.4,
          params.tableLegHeight * 0.6,
          params.tableTopHeight * 0.4
        ),
      tableLegGeo
        .clone()
        .rotateX(-Math.PI / 6)
        .rotateZ(Math.PI / 6)
        .translate(
          params.tableTopWidth * 0.4,
          params.tableLegHeight * 0.6,
          params.tableTopHeight * 0.4
        ),
      tableLegGeo
        .clone()
        .rotateX(Math.PI / 6)
        .rotateZ(Math.PI / 6)
        .translate(
          params.tableTopWidth * 0.4,
          params.tableLegHeight * 0.6,
          -params.tableTopHeight * 0.4
        ),
      tableLegGeo
        .clone()
        .rotateX(Math.PI / 6)
        .rotateZ(-Math.PI / 6)
        .translate(
          -params.tableTopWidth * 0.4,
          params.tableLegHeight * 0.6,
          -params.tableTopHeight * 0.4
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

  return model
}
