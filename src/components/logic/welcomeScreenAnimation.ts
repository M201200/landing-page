import gsap from "gsap"
import {
  blueCard,
  gameCard,
  greenCard,
  yellowCard,
} from "../3dObjects/GameCard"
import { scene, camera } from "./renderEnvironment"
import { puzzlePiece } from "../3dObjects/PuzzlePiece"
import { SRGBColorSpace, TextureLoader, RepeatWrapping } from "three"

export function welcomeScreenAnimation() {
  const Card1 = gameCard({
    faceColor: yellowCard,
    number: 2,
    posX: 1.6,
    posY: -6.7,
    posZ: 0.1,
    rotZ: 0,
    rotX: -Math.PI / 2,
  })

  const Card2 = gameCard({
    faceColor: blueCard,
    number: 7,
    posX: 1.6,
    posY: -6.8,
    posZ: 0.1,
    rotZ: 0,
    rotX: -Math.PI / 2,
  })
  const Card3 = gameCard({
    faceColor: greenCard,
    number: 0,
    posX: 1.6,
    posY: -6.9,
    posZ: 0.1,
    rotZ: 0,
    rotX: -Math.PI / 2,
  })

  const textureLoader = new TextureLoader()
  const texture = textureLoader.load("/public/images/nature.jpg")
  texture.colorSpace = SRGBColorSpace
  texture.wrapS = texture.wrapT = RepeatWrapping
  texture.repeat.set(1 / 5, 1 / 5)
  const texture1 = texture.clone()
  texture1.offset.set(2 / 5, 3 / 5)
  const texture2 = texture.clone()
  texture2.offset.set(2 / 5, 4 / 5)

  const puzzlePiece1 = puzzlePiece({
    texture: texture1,
    scale: 0.5,
    posX: 0.8,
    posY: -6.9,
    posZ: 0.2,
    rotZ: -Math.PI / 3,
  })
  const puzzlePiece2 = puzzlePiece({
    texture: texture2,
    scale: 0.5,
    posX: 0,
    posY: -6.9,
    posZ: 0.3,
    rotZ: Math.PI / 6,
  })

  scene.add(
    Card1.model,
    Card2.model,
    Card3.model,
    puzzlePiece1.model,
    puzzlePiece2.model
  )

  gsap.to(Card1.model.position, { x: 1.78, z: 0.45, duration: 0.4, delay: 2 })
  gsap.to(Card1.model.rotation, { z: -Math.PI / 2.5, duration: 0.4, delay: 2 })
  gsap.to(Card2.model.position, { x: 1.76, z: 0.22, duration: 0.4, delay: 2.2 })
  gsap.to(Card2.model.rotation, {
    z: -Math.PI / 4.5,
    duration: 0.4,
    delay: 2.2,
  })
  gsap.to(Card3.model.position, { z: 0, duration: 0.4, delay: 2.4 })

  //   gsap.to(puzzlePiece1.model.position, { x: 1, duration: 0.4, delay: 2.6 })
  gsap.to(puzzlePiece1.model.rotation, {
    z: Math.PI / 2,
    duration: 0.4,
    delay: 2.6,
  })

  gsap.to(puzzlePiece2.model.position, {
    x: 0.3,
    z: 0.2,
    duration: 0.4,
    delay: 2.8,
  })
  gsap.to(puzzlePiece2.model.rotation, {
    z: Math.PI / 2,
    duration: 0.4,
    delay: 2.8,
  })
}
