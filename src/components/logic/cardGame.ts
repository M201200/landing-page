import gsap from "gsap"
import type { GameCard } from "../../types/3dObjects"
import { gameCardParams } from "../3dObjects/GameCard"
import { tableHeight } from "../3dObjects/Table"

const duration = 0.2
const cardsToDeal = 28
let firstDeck = 0
let secondDeck = 0
let thirdDeck = 0
let fourthDeck = 0

export function cardGame(cardDeck: GameCard[]) {
  shuffleArray(cardDeck)
  cardDeck.forEach((card, idx) => {
    card.model.position.y =
      tableHeight +
      gameCardParams.depth * 1.1 * 40 -
      gameCardParams.depth * 1.1 * (idx + 1)
  })
  for (let i = 0; i <= cardsToDeal; i++) {
    if (i % 4 === 0 && i !== cardsToDeal) {
      firstDeck++

      moveCard({ cardDeck: cardDeck, cardNumber: firstDeck, index: i })

      startGame({ cardDeck: cardDeck, cardNumber: firstDeck, index: i })
    }
    if (i % 4 === 1 && i !== cardsToDeal) {
      secondDeck++

      moveCard({
        cardDeck: cardDeck,
        cardNumber: secondDeck,
        index: i,
        posX: 4,
        posZ: 0,
        orientZ: -1.5708,
      })
      startGame({
        cardDeck: cardDeck,
        cardNumber: secondDeck,
        index: i,
        posX: 4 + 1.1 * gameCardParams.depth * secondDeck,
        posZ: secondDeck * 0.08,
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
        posX: 0,
        posZ: -4,
        orientZ: Math.PI,
      })
      startGame({
        cardDeck: cardDeck,
        cardNumber: thirdDeck,
        index: i,
        posZ: -4,
        rotX: Math.PI / 4,
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
        posX: -4,
        posZ: 0,
        orientZ: 1.5708,
      })
      startGame({
        cardDeck: cardDeck,
        cardNumber: fourthDeck,
        index: i,
        posX: -4 + 1.1 * gameCardParams.depth * fourthDeck,
        posZ: -fourthDeck * 0.08,
        rotX: 0,
        rotY: -1.5708,
        rotZ: -Math.PI / 4 + fourthDeck * 0.28,
      })
    }
    if (i === cardsToDeal) {
      moveCard({
        cardDeck: cardDeck,
        index: i,
        posX: 0,
        posZ: 0,
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
      makeTurn({ cardDeck: cardDeck, index: i })
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
  posZ = 4,
  rotX = Math.PI / 2,
  rotY = 0,
  rotZ = +Math.random().toFixed(3),
}: AnimateCards) {
  gsap.to(cardDeck[index].model.position, {
    x: posX + +Math.random().toFixed(3) / 4,
    y: tableHeight + posY,
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
  posZ = 4,
  rotX = -Math.PI / 4,
  rotY = 0,
  rotZ = Math.PI / 3 - cardNumber * 0.28,
}: AnimateCards) {
  gsap.to(cardDeck[index].model.position, {
    x: posX,
    y: tableHeight + posY,
    z: posZ,
    duration: duration * 2,
    delay: cardsToDeal * duration + duration * 1.5,
  })
  gsap.to(cardDeck[index].model.quaternion, {
    x: Math.PI / 2,
    y: 0,
    z: 0 + orientZ,
    duration: duration * 2,
    delay: cardsToDeal * duration + duration * 1.5,
  })
  gsap.to(cardDeck[index].model.position, {
    x: posX,
    y: tableHeight + posY + 2,
    z: posZ,
    duration: duration * 2,
    delay: cardsToDeal * duration + duration * 3,
  })
  gsap.to(cardDeck[index].model.quaternion, {
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
}: {
  cardDeck: GameCard[]
  index: number
}) {
  const randomZ = Math.random()
  gsap.to(cardDeck[index].model.position, {
    x: 0,
    y: 0.28,
    z: -0.28,
    duration: duration * 2,
    delay: cardsToDeal * duration + duration * 6,
  })
  gsap.to(cardDeck[index].model.position, {
    x: 0,
    y: tableHeight + gameCardParams.depth * 2 * 1.1,
    z: 0,
    duration: duration * 2,
    delay: cardsToDeal * duration + duration * 8,
  })

  gsap.to(cardDeck[index].model.quaternion, {
    x: -Math.PI / 2,
    y: 0,
    z: randomZ,
    duration: duration * 2,
    delay: cardsToDeal * duration + duration * 8,
  })
  // }
}
