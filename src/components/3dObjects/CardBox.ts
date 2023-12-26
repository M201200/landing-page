import { BoxGeometry, Group, Mesh, MeshStandardMaterial } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import type { GameCardParams } from "../../types/3dObjects"

type CardBox = {
  posX?: number
  posY?: number
  posZ?: number
  rotX?: number
  rotY?: number
  rotZ?: number
  scale?: number
  deckSize?: number
  cardParams: GameCardParams
}

export function cardBox({
  posX = 0,
  posY = 0,
  posZ = 0,
  rotX = 0,
  rotY = 0,
  rotZ = 0,
  scale = 1,
  deckSize = 40,
  cardParams,
}: CardBox) {
  const frontGeo = new BoxGeometry(
    cardParams.width,
    cardParams.height,
    cardParams.depth
  )
  const sideGeo = new BoxGeometry(
    cardParams.height,
    cardParams.depth * deckSize * 1.02,
    cardParams.depth
  )
  const rearGeo = new BoxGeometry(
    cardParams.width,
    cardParams.depth * deckSize * 1.02,
    cardParams.depth
  )
  // const lidGeo = new BoxGeometry(width - depth * 2, sideHeight, depth)

  const base = new Mesh(
    mergeGeometries([
      frontGeo
        .clone()
        .rotateX(Math.PI / 2)
        .translate(0, (-cardParams.depth * deckSize * 1.02) / 2, 0),
      rearGeo
        .clone()
        .translate(0, 0, (cardParams.height - cardParams.depth) / 2),
      sideGeo
        .clone()
        .rotateY(Math.PI / 2)
        .translate(-(cardParams.width - cardParams.depth) / 2, 0, 0),
      sideGeo
        .clone()
        .rotateY(Math.PI / 2)
        .translate((cardParams.width - cardParams.depth) / 2, 0, 0),
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

  const top = new Mesh(frontGeo.clone(), lidTopMaterial)
  top
    .rotateX(Math.PI / 2)
    .translateZ(-(cardParams.depth * deckSize * 1.02 + cardParams.depth) / 2)

  // const lid = new Mesh(
  //   lidGeo.clone().translate(0, 0, -(height - depth) / 2),
  //   new MeshStandardMaterial({
  //     color: 32199742,
  //     roughness: 0.6,
  //   })
  // )

  // lid.name = "lid base"

  const model = new Group()
  model.add(base, top)

  model.position.set(posX, posY, posZ)
  model.rotation.set(rotX, rotY, rotZ)
  model.scale.set(scale, scale, scale)

  return model
}
