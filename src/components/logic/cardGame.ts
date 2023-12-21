import gsap from "gsap"
import type { GameCard } from "../../types/3dObjects"
import { gameCardParams } from "../3dObjects/GameCard"
import { cardTableRadius, cardTableHeight } from "../3dObjects/CardTable"

const duration = 0.2
const cardsToDeal = 28
let firstDeck = 0
let secondDeck = 0
let thirdDeck = 0
let fourthDeck = 0

export function cardGame(
  cardDeck: GameCard[],
  { posX = 0, posZ = 0, scale = 1 } = {}
) {
  const offset = 3.5 * 0.08
  const radius = cardTableRadius * 0.68
  shuffleArray(cardDeck)
  cardDeck.forEach((card, idx) => {
    card.model.position.y =
      cardTableHeight +
      gameCardParams.depth * scale * 20 -
      gameCardParams.depth * scale * (idx + 1)
  })
  for (let i = 0; i <= cardsToDeal; i++) {
    if (i % 4 === 0 && i !== cardsToDeal) {
      firstDeck++

      moveCard({
        cardDeck: cardDeck,
        cardNumber: firstDeck,
        index: i,
        posX: posX,
        posZ: posZ + radius,
      })

      startGame({
        cardDeck: cardDeck,
        cardNumber: firstDeck,
        index: i,
        posX: posX - offset + firstDeck * 0.08,
        posZ: posZ + radius,
      })
    }
    if (i % 4 === 1 && i !== cardsToDeal) {
      secondDeck++

      moveCard({
        cardDeck: cardDeck,
        cardNumber: secondDeck,
        index: i,
        posX: posX + radius,
        posZ: posZ,
        orientZ: -Math.PI / 2,
      })
      startGame({
        cardDeck: cardDeck,
        cardNumber: secondDeck,
        index: i,
        posX: posX + radius + 1.1 * gameCardParams.depth * secondDeck,
        posZ: posZ - offset + secondDeck * 0.08,
        rotX: 0,
        rotY: Math.PI / 2,
        rotZ: -Math.PI / 4 + secondDeck * 0.28,
      })
    }
    if (i % 4 === 2 && i !== cardsToDeal) {
      thirdDeck++

      moveCard({
        cardDeck: cardDeck,
        cardNumber: thirdDeck,
        index: i,
        posX: posX,
        posZ: posZ - radius,
        orientZ: Math.PI,
      })
      startGame({
        cardDeck: cardDeck,
        cardNumber: thirdDeck,
        index: i,
        posX: posX - offset + thirdDeck * 0.08,
        posZ: posZ - radius - 1.1 * gameCardParams.depth * thirdDeck,
        rotX: 0,
        rotY: Math.PI,
        rotZ: -Math.PI / 4 + thirdDeck * 0.28,
      })
    }
    if (i % 4 === 3 && i !== cardsToDeal) {
      fourthDeck++
      moveCard({
        cardDeck: cardDeck,
        cardNumber: fourthDeck,
        index: i,
        posX: posX - radius,
        posZ: posZ,
        orientZ: Math.PI / 2,
      })
      startGame({
        cardDeck: cardDeck,
        cardNumber: fourthDeck,
        index: i,
        posX: posX + 1.1 * gameCardParams.depth * fourthDeck - radius,
        posZ: posZ + offset - fourthDeck * 0.08,
        rotX: 0,
        rotY: -Math.PI / 2,
        rotZ: -Math.PI / 4 + fourthDeck * 0.28,
      })
    }
    if (i === cardsToDeal) {
      moveCard({
        cardDeck: cardDeck,
        index: i,
        posX: posX,
        posY: 1.1 * gameCardParams.depth,
        posZ: posZ,
        rotX: -Math.PI / 2,
      })
    }
  }
  for (let i = 0; i <= cardsToDeal; i++) {
    if (
      i % 4 === 0 &&
      i !== cardsToDeal &&
      (cardDeck[cardsToDeal].faceColor === cardDeck[i].faceColor ||
        cardDeck[cardsToDeal].number === cardDeck[i].number)
    ) {
      makeTurn({
        cardDeck: cardDeck,
        index: i,
        posX: posX,
        posY: 1.1 * gameCardParams.depth * 2,
        posZ: posZ,
      })
      break
    }
  }
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

type AnimateCards = {
  cardDeck: GameCard[]
  cardNumber?: number
  index: number
  orientZ?: number
  posX?: number
  posY?: number
  posZ?: number
  rotX?: number
  rotY?: number
  rotZ?: number
}

function moveCard({
  cardDeck,
  cardNumber = 1,
  index,
  orientZ = 0,
  posX = 0,
  posY = 1.1 * gameCardParams.depth * cardNumber,
  posZ = 0.5,
  rotX = Math.PI / 2,
  rotY = 0,
  rotZ = +Math.random().toFixed(3),
}: AnimateCards) {
  gsap.to(cardDeck[index].model.position, {
    x: posX + +Math.random().toFixed(3) / 4,
    y: cardTableHeight + posY,
    z: posZ + +Math.random().toFixed(3) / 4,
    duration: duration,
    delay: index * duration,
  })
  gsap.to(cardDeck[index].model.rotation, {
    x: rotX,
    y: rotY,
    z: rotZ + orientZ,
    duration: duration,
    delay: index * duration,
  })
}

function startGame({
  cardDeck,
  index,
  cardNumber = 1,
  orientZ = 0,
  posX = cardNumber * 0.08,
  posY = 1.1 * gameCardParams.depth * cardNumber,
  posZ = 0.5,
  rotX = -Math.PI / 4,
  rotY = 0,
  rotZ = Math.PI / 3 - cardNumber * 0.28,
}: AnimateCards) {
  gsap.to(cardDeck[index].model.position, {
    x: posX,
    y: cardTableHeight + posY,
    z: posZ,
    duration: duration * 2,
    delay: cardsToDeal * duration + duration * 1.5,
  })
  gsap.to(cardDeck[index].model.rotation, {
    x: Math.PI / 2,
    y: 0,
    z: 0 + orientZ,
    duration: duration * 2,
    delay: cardsToDeal * duration + duration * 1.5,
  })
  gsap.to(cardDeck[index].model.position, {
    x: posX,
    y: cardTableHeight + posY + 1,
    z: posZ,
    duration: duration * 2,
    delay: cardsToDeal * duration + duration * 3,
  })
  gsap.to(cardDeck[index].model.rotation, {
    x: rotX,
    y: rotY,
    z: rotZ + orientZ,
    duration: duration * 3,
    delay: cardsToDeal * duration + duration * 3,
  })
}

function makeTurn({
  cardDeck,
  index,
  posX = 0,
  posY = 1.1 * gameCardParams.depth * 2,
  posZ = 0,
}: {
  cardDeck: GameCard[]
  index: number
  posX?: number
  posY?: number
  posZ?: number
}) {
  const randomZ = Math.random()
  gsap.to(cardDeck[index].model.position, {
    x: 0 + posX,
    y: cardTableHeight + 0.28 + posY,
    z: -0.28 + posZ,
    duration: duration * 2,
    delay: cardsToDeal * duration + duration * 6,
  })
  gsap.to(cardDeck[index].model.position, {
    x: posX,
    y: cardTableHeight + posY,
    z: posZ,
    duration: duration * 2,
    delay: cardsToDeal * duration + duration * 8,
  })

  gsap.to(cardDeck[index].model.rotation, {
    x: -Math.PI / 2,
    y: 0,
    z: randomZ,
    duration: duration * 2,
    delay: cardsToDeal * duration + duration * 8,
  })
  // }
}
