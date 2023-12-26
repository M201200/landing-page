import { BoxGeometry, Group, Mesh, MeshStandardMaterial } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import type { JigsawBox } from "../../types/3dObjects"

export function jigsawBox({
  posX = 0,
  posY = 0,
  posZ = 0,
  rotX = 0,
  rotY = 0,
  rotZ = 0,
  scale = 1,
} = {}): JigsawBox {
  const params = {
    size: 2,
    height: 0.5,
    depth: 0.02,
    lidSize: 2 + 0.02 * 2,
  }
  const bottomGeo = new BoxGeometry(params.size, params.size, params.depth)
  const sideGeo = new BoxGeometry(params.size, params.height, params.depth)
  const lidTopGeo = new BoxGeometry(
    params.lidSize,
    params.lidSize,
    params.depth
  )
  const lidSideGeo = new BoxGeometry(
    params.lidSize,
    params.height * 0.85,
    params.depth
  )

  const base = new Mesh(
    mergeGeometries([
      bottomGeo.rotateX(Math.PI / 2).translate(0, -params.height / 2, 0),
      sideGeo.clone().translate(0, 0, -(params.size - params.depth) / 2),
      sideGeo.clone().translate(0, 0, (params.size - params.depth) / 2),
      sideGeo
        .clone()
        .rotateY(Math.PI / 2)
        .translate(-(params.size - params.depth) / 2, 0, 0),
      sideGeo
        .clone()
        .rotateY(Math.PI / 2)
        .translate((params.size - params.depth) / 2, 0, 0),
    ]),
    new MeshStandardMaterial({
      color: 25200742,
      roughness: 0.6,
    })
  )

  const lidTopMaterial = new MeshStandardMaterial({
    color: 22199742,
    roughness: 0.6,
  })

  const lidTop = new Mesh(lidTopGeo, lidTopMaterial)
  lidTop.rotateX(Math.PI / 2).translateZ(-params.height / 2)

  const lidSides = new Mesh(
    mergeGeometries([
      lidSideGeo
        .clone()
        .translate(0, params.depth * 2, -(params.lidSize - params.depth) / 2),
      lidSideGeo
        .clone()
        .translate(0, params.depth * 2, (params.lidSize - params.depth) / 2),
      lidSideGeo
        .clone()
        .rotateY(Math.PI / 2)
        .translate(-(params.lidSize - params.depth) / 2, params.depth * 2, 0),
      lidSideGeo
        .clone()
        .rotateY(Math.PI / 2)
        .translate((params.lidSize - params.depth) / 2, params.depth * 2, 0),
    ]),
    lidTopMaterial
  )

  base.name = "base"
  lidTop.name = "lid"
  lidSides.name = "lid"

  base.receiveShadow = true
  base.castShadow = true
  lidTop.receiveShadow = true
  lidTop.castShadow = true
  lidSides.receiveShadow = true
  lidSides.castShadow = true

  const model = new Group()
  model.add(base, lidSides, lidTop)

  model.position.set(posX, posY, posZ)
  model.rotation.set(rotX, rotY, rotZ)
  model.scale.set(scale, scale, scale)

  return { model, params }
}
