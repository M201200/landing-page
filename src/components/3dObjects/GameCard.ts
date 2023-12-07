import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js"
import { FontLoader } from "three/addons/loaders/FontLoader.js"
import { TextGeometry } from "three/addons/geometries/TextGeometry.js"
import {
  Mesh,
  MeshStandardMaterial,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
  Group,
} from "three"
import { Body, Box, Material, Quaternion, Vec3 } from "cannon-es"
import type { GameCard } from "../../types/3dObjects"

import { cardBackgroundTemplate } from "../templates/CardBackgroundTemplate.ts"

type GameCardProps = {
  faceColor: string
  number: number
  posX?: number
  posY?: number
  posZ?: number
  rotX?: number
  rotY?: number
  rotZ?: number
}

export const gameCardParams = {
  width: 0.5,
  height: 0.75,
  depth: 0.008,
  segments: 1,
  radius: 0.4,
}

const textureLoader = new TextureLoader()

export function gameCard({
  faceColor,
  number,
  posX = 0,
  posY = 1,
  posZ = 0,
  rotX = 1.5708,
  rotY = 0,
  rotZ = 1.5708 * 2,
}: GameCardProps): GameCard {
  const model = new Group()

  const position = new Vector3(posX, posY, posZ)
  const rotation = new Vector3(rotX, rotY, rotZ)
  const CardGeo = new RoundedBoxGeometry(
    gameCardParams.width,
    gameCardParams.height,
    gameCardParams.depth,
    gameCardParams.segments,
    gameCardParams.radius
  )

  const svgStrBackdrop = cardBackgroundTemplate()
  const svgBackdrop =
    "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgStrBackdrop)
  const svgStrFace = cardBackgroundTemplate({
    background: faceColor,
    foreground: "F9F7F7",
  })
  const svgFace =
    "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgStrFace)

  const face = textureLoader.load(svgFace)
  face.colorSpace = SRGBColorSpace
  const backdrop = textureLoader.load(svgBackdrop)
  backdrop.colorSpace = SRGBColorSpace

  const CardMaterial = [
    new MeshStandardMaterial({ color: 0xeeeeee }),
    new MeshStandardMaterial({ color: 0xeeeeee }),
    new MeshStandardMaterial({ color: 0xeeeeee }),
    new MeshStandardMaterial({ color: 0xeeeeee }),
    new MeshStandardMaterial({
      map: face,
      lightMap: face,
    }),
    new MeshStandardMaterial({
      map: backdrop,
      lightMap: backdrop,
    }),
  ]

  const card = new Mesh(CardGeo, CardMaterial)

  card.castShadow = true
  card.receiveShadow = true
  model.add(card)

  const textHeight = 0.0001
  const fontLoader = new FontLoader()
  fontLoader.load("/assets/fonts/RobotoBlack_Italic.json", (loadedFont) => {
    const font = loadedFont

    const centerNumberSize = 0.3
    const centerNumberGeo = new TextGeometry(number.toString(), {
      font: font,
      size: centerNumberSize,
      height: textHeight,
    })
    const centerNumberMaterial = new MeshStandardMaterial({
      color: +`0x${faceColor}`,
    })

    const centerNumber = new Mesh(centerNumberGeo, centerNumberMaterial)
    centerNumber
      .translateZ(gameCardParams.depth / 2 + textHeight)
      .translateX(-centerNumberSize / 2.6)
      .translateY(-centerNumberSize / 2).receiveShadow = true

    const sideNumberSize = 0.1
    const sideNumberGeo = new TextGeometry(number.toString(), {
      font: font,
      size: sideNumberSize,
      height: textHeight,
    })

    const sideNumberMaterial = new MeshStandardMaterial({ color: 0xf9f7f7 })

    const upperSideNumber = new Mesh(sideNumberGeo, sideNumberMaterial)
    upperSideNumber
      .translateZ(gameCardParams.depth / 2 + textHeight)
      .translateX(sideNumberSize / 3.5 - gameCardParams.width / 2)
      .translateY(
        sideNumberSize / 2 + gameCardParams.height / 4
      ).receiveShadow = true

    const bottomSideNumber = new Mesh(sideNumberGeo, sideNumberMaterial)
    bottomSideNumber
      .rotateZ(Math.PI)
      .translateZ(gameCardParams.depth / 2 + textHeight)
      .translateX(sideNumberSize / 3.5 - gameCardParams.width / 2)
      .translateY(
        sideNumberSize / 2 + gameCardParams.height / 4
      ).receiveShadow = true

    const backdropTextSize = 0.16
    const backdropTextGeo = new TextGeometry("RBGY", {
      font: font,
      size: backdropTextSize,
      height: textHeight,
    })
    const backdropTextMaterial = new MeshStandardMaterial({
      color: 0xfed500,
    })

    const backdropText = new Mesh(backdropTextGeo, backdropTextMaterial)
    backdropText
      .translateZ(-gameCardParams.depth / 2 - textHeight * 2)
      .translateX(-backdropTextSize + gameCardParams.width / 1.9)
      .translateY(-backdropTextSize / 2 - gameCardParams.height / 3.8)
      .rotateZ(-Math.PI / 3.34)
      .rotateY(Math.PI).receiveShadow = true

    const backdropTextShadowMaterial = new MeshStandardMaterial({
      color: 0x161617,
    })
    const backdropTextShadow = backdropText.clone()
    backdropTextShadow.material = backdropTextShadowMaterial
    backdropTextShadow
      .translateZ(-0.0001)
      .translateX(-backdropTextSize * 0.05)
      .translateY(-backdropTextSize * 0.05)
    model.add(
      centerNumber,
      upperSideNumber,
      bottomSideNumber,
      backdropText,
      backdropTextShadow
    )
  })

  model.position.copy(position)

  model.rotation.set(rotation.x, rotation.y, rotation.z)

  const body = new Body({
    mass: 0.08,
    material: new Material({ restitution: 0, friction: 0.8 }),
    shape: new Box(
      new Vec3(
        gameCardParams.width / 2,
        gameCardParams.height / 2,
        gameCardParams.depth / 2 + textHeight * 2
      )
    ),
    position: new Vec3(model.position.x, model.position.y, model.position.z),
    quaternion: new Quaternion(
      model.quaternion.x,
      model.quaternion.y,
      model.quaternion.z,
      model.quaternion.w
    ),
    sleepTimeLimit: 0.4,
  })
  body.allowSleep = true
  body.sleep()

  return { model, body, faceColor, number }
}
