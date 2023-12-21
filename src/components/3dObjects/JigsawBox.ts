import { BoxGeometry, Group, Mesh, MeshStandardMaterial } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"

export function jigsawBox({
  posX = 0,
  posY = 0,
  posZ = 0,
  rotX = 0,
  rotY = 0,
  rotZ = 0,
  scale = 1,
} = {}) {
  const size = 2
  const height = 0.5
  const depth = 0.02
  const lidSize = size + depth * 2

  const bottomGeo = new BoxGeometry(size, size, depth)
  const sideGeo = new BoxGeometry(size, height, depth)
  const lidTopGeo = new BoxGeometry(lidSize, lidSize, depth)
  const lidSideGeo = new BoxGeometry(lidSize, height * 0.85, depth)

  const base = new Mesh(
    mergeGeometries([
      bottomGeo.rotateX(Math.PI / 2).translate(0, -height / 2, 0),
      sideGeo.clone().translate(0, 0, -(size - depth) / 2),
      sideGeo.clone().translate(0, 0, (size - depth) / 2),
      sideGeo
        .clone()
        .rotateY(Math.PI / 2)
        .translate(-(size - depth) / 2, 0, 0),
      sideGeo
        .clone()
        .rotateY(Math.PI / 2)
        .translate((size - depth) / 2, 0, 0),
    ]),
    new MeshStandardMaterial({
      color: 25200742,
      roughness: 0.6,
    })
  )

  const lidTopMaterial = new MeshStandardMaterial({
    color: 15199742,
    roughness: 0.6,
  })

  const lidTop = new Mesh(lidTopGeo, lidTopMaterial)
  lidTop.rotateX(Math.PI / 2).translateZ(-height / 2)

  const lidSides = new Mesh(
    mergeGeometries([
      lidSideGeo.clone().translate(0, depth * 2, -(lidSize - depth) / 2),
      lidSideGeo.clone().translate(0, depth * 2, (lidSize - depth) / 2),
      lidSideGeo
        .clone()
        .rotateY(Math.PI / 2)
        .translate(-(lidSize - depth) / 2, depth * 2, 0),
      lidSideGeo
        .clone()
        .rotateY(Math.PI / 2)
        .translate((lidSize - depth) / 2, depth * 2, 0),
    ]),
    lidTopMaterial
  )

  base.name = "base"
  lidTop.name = "lid"
  lidSides.name = "lid"

  const model = new Group()
  model.add(base, lidTop, lidSides)

  model.position.set(posX, posY, posZ)
  model.rotation.set(rotX, rotY, rotZ)
  model.scale.set(scale, scale, scale)

  return model
}
