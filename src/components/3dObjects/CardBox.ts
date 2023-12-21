import { BoxGeometry, Group, Mesh, MeshStandardMaterial } from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import { gameCardParams } from "./GameCard"

export const cardBoxWidth = gameCardParams.width * 1.02
export const cardBoxHeight = gameCardParams.height * 1.02
export const cardBoxDepth = gameCardParams.depth
export const cardBoxSideHeight = cardBoxDepth * 42

export function cardBox({
  posX = 0,
  posY = 0,
  posZ = 0,
  rotX = 0,
  rotY = 0,
  rotZ = 0,
  scale = 1,
} = {}) {
  const frontGeo = new BoxGeometry(cardBoxWidth, cardBoxHeight, cardBoxDepth)
  const sideGeo = new BoxGeometry(
    cardBoxHeight,
    cardBoxSideHeight,
    cardBoxDepth
  )
  const rearGeo = new BoxGeometry(cardBoxWidth, cardBoxSideHeight, cardBoxDepth)
  // const lidGeo = new BoxGeometry(width - depth * 2, sideHeight, depth)

  const base = new Mesh(
    mergeGeometries([
      frontGeo
        .clone()
        .rotateX(Math.PI / 2)
        .translate(0, -cardBoxSideHeight / 2, 0),
      rearGeo.clone().translate(0, 0, (cardBoxHeight - cardBoxDepth) / 2),
      sideGeo
        .clone()
        .rotateY(Math.PI / 2)
        .translate(-(cardBoxWidth - cardBoxDepth) / 2, 0, 0),
      sideGeo
        .clone()
        .rotateY(Math.PI / 2)
        .translate((cardBoxWidth - cardBoxDepth) / 2, 0, 0),
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
  top.rotateX(Math.PI / 2).translateZ(-(cardBoxSideHeight + cardBoxDepth) / 2)

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
