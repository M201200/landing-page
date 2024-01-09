import gsap from "gsap"
import {
  blueCard,
  gameCard,
  greenCard,
  yellowCard,
} from "../3dObjects/GameCard"
import { puzzlePiece } from "../3dObjects/PuzzlePiece"
import { SRGBColorSpace, TextureLoader, RepeatWrapping, Scene } from "three"
import type { JigsawPiece } from "../../types/3dObjects"
import { shuffleArray } from "./shuffleArray"

const textureLoader = new TextureLoader()

export function welcomeScreenAnimation(scene: Scene) {
  const duration = 0.28
  const timeline = gsap.timeline()

  const Card1 = gameCard({
    faceColor: yellowCard,
    number: Math.trunc(Math.random() * 10),
    posX: 1.6,
    posY: -6.7,
    posZ: 0.1,
    rotZ: 0,
    rotX: -Math.PI / 2,
  })

  const Card2 = gameCard({
    faceColor: blueCard,
    number: Math.trunc(Math.random() * 10),
    posX: 1.6,
    posY: -6.8,
    posZ: 0.1,
    rotZ: 0,
    rotX: -Math.PI / 2,
  })
  const Card3 = gameCard({
    faceColor: greenCard,
    number: Math.trunc(Math.random() * 10),
    posX: 1.6,
    posY: -6.9,
    posZ: 0.1,
    rotZ: 0,
    rotX: -Math.PI / 2,
  })

  const line = textureLoader.load("/images/line.jpg")
  line.rotation = Math.PI / 2
  line.colorSpace = SRGBColorSpace
  line.wrapS = line.wrapT = RepeatWrapping

  const pieces: JigsawPiece[] = []
  const pieceScale = 0.5

  for (let i = 0; i <= 5; i++) {
    pieces.push(
      puzzlePiece({
        texture: line,
        scale: pieceScale,
        posX: -2.2 + pieceScale * 1.1 * i,
        posY: -6.9 + Math.random() / 5,
        posZ: 0.2 - Math.random() / 8 + Math.random() / 5,
        rotZ: Math.random() * 5,
      })
    )
  }

  shuffleArray(pieces)

  pieces.forEach((piece, idx) => {
    if (idx === 0) {
      timeline
        .to(piece.model.position, {
          x: 0.8,
          y: -6.9,
          z: 0.2,
          duration: duration,
          delay: 2,
        })
        .to(
          piece.model.rotation,
          {
            z: Math.PI / 2,
            duration: duration,
          },
          "-=" + duration
        )
    } else {
      timeline
        .to(
          piece.model.position,
          {
            x: 0.8 - idx * 0.5,
            y: -6.9,
            z: 0.2,
            duration: duration,
          },
          "-=" + duration / 2
        )
        .to(
          piece.model.rotation,
          {
            z: Math.PI / 2,
            duration: duration,
          },
          "-=" + duration
        )
    }
  })

  timeline
    .to(Card1.model.position, {
      x: 1.78,
      z: 0.45,
      duration: duration,
    })
    .to(
      Card1.model.rotation,
      {
        z: -Math.PI / 2.5,
        duration: duration,
      },
      "-=" + duration
    )
    .to(
      Card2.model.position,
      {
        x: 1.76,
        z: 0.22,
        duration: duration,
      },
      "-=" + duration / 2
    )
    .to(
      Card2.model.rotation,
      {
        z: -Math.PI / 4.5,
        duration: duration,
      },
      "-=" + duration
    )
    .to(
      Card3.model.position,
      {
        z: 0,
        duration: duration,
      },
      "-=" + duration / 2
    )

  pieces.forEach((piece) => scene.add(piece.model))
  scene.add(Card1.model, Card2.model, Card3.model)
}
