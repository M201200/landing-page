import gsap from "gsap"
import type { Deck } from "../../types/3dObjects"

const duration = 0.2
const cardsToDeal = 28
const CardsInHand = 7

let firstDeck = 0
let secondDeck = 0
let thirdDeck = 0
let fourthDeck = 0

export function cardGame(
  cardDeck: Deck,
  { posX = 0, posZ = 0, scale = 1 } = {}
) {
  const cardParams = cardDeck.cards[0].params
  const multiplier = 0.08
  const offset = (CardsInHand * multiplier) / 2
  const radius = cardDeck.table.radius * 0.68

  shuffleArray(cardDeck.cards)

  cardDeck.cards.forEach((card, idx) => {
    card.model.position.y =
      cardDeck.table.height +
      card.params.depth * scale * 20 -
      card.params.depth * scale * (idx + 1)
  })
  gsap
    .to(cardDeck.box.position, {
      z: cardDeck.table.model.position.z + 2,
      delay: 3,
      duration: 1,
    })
    .then(() => {
      for (let i = 0; i <= cardsToDeal; i++) {
        if (i % 4 === 0 && i !== cardsToDeal) {
          firstDeck++
          moveCard({
            cardDeck: cardDeck,
            index: i,
            posX: posX,
            posY: firstDeck * cardParams.depth,
            posZ: posZ + radius,
          })
          startGame({
            cardDeck: cardDeck,
            index: i,
            posX: posX - offset + firstDeck * multiplier,
            posZ: posZ + radius + firstDeck * cardParams.depth,
            rotX: -Math.PI / 4,
            rotZ: Math.PI / 4 - firstDeck * 0.2,
          })
        }
        if (i % 4 === 1 && i !== cardsToDeal) {
          secondDeck++

          moveCard({
            cardDeck: cardDeck,
            index: i,
            posX: posX + radius,
            posY: secondDeck * cardParams.depth,
            posZ: posZ,
            orientZ: -Math.PI / 2,
          })
          startGame({
            cardDeck: cardDeck,
            index: i,
            posX: posX + radius + secondDeck * cardParams.depth,
            posZ: posZ - offset + secondDeck * multiplier,
            rotX: 0,
            rotY: Math.PI / 2,
            rotZ: -Math.PI / 4 + secondDeck * 0.2,
          })
        }
        if (i % 4 === 2 && i !== cardsToDeal) {
          thirdDeck++

          moveCard({
            cardDeck: cardDeck,
            index: i,
            posX: posX,
            posY: thirdDeck * cardParams.depth,
            posZ: posZ - radius,
            orientZ: Math.PI,
          })
          startGame({
            cardDeck: cardDeck,
            index: i,
            posX: posX - offset + thirdDeck * multiplier,
            posZ: posZ - radius - thirdDeck * cardParams.depth,
            rotX: 0,
            rotY: Math.PI,
            rotZ: -Math.PI / 4 + thirdDeck * 0.2,
          })
        }
        if (i % 4 === 3 && i !== cardsToDeal) {
          fourthDeck++
          moveCard({
            cardDeck: cardDeck,
            index: i,
            posX: posX - radius,
            posY: fourthDeck * cardParams.depth,
            posZ: posZ,
            orientZ: Math.PI / 2,
          })
          startGame({
            cardDeck: cardDeck,
            index: i,
            posX: posX - radius + fourthDeck * cardParams.depth,
            posZ: posZ + offset - fourthDeck * multiplier,
            rotX: 0,
            rotY: -Math.PI / 2,
            rotZ: -Math.PI / 4 + fourthDeck * 0.2,
          })
        }
        if (i === cardsToDeal) {
          moveCard({
            cardDeck: cardDeck,
            index: i,
            posX: posX,
            posY: 1.1 * cardParams.depth,
            posZ: posZ,
            rotX: -Math.PI / 2,
          })
        }
      }

      for (let i = 0; i <= cardsToDeal; i++) {
        if (
          i % 4 === 0 &&
          i !== cardsToDeal &&
          (cardDeck.cards[cardsToDeal].faceColor ===
            cardDeck.cards[i].faceColor ||
            cardDeck.cards[cardsToDeal].number === cardDeck.cards[i].number)
        ) {
          makeTurn({
            cardDeck: cardDeck,
            index: i,
            posX: posX,
            posY: 1.1 * cardParams.depth * 2,
            posZ: posZ,
          })
          break
        }
      }
    })
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

type AnimateCards = {
  cardDeck: Deck
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
  index,
  orientZ = 0,
  posX = 0,
  posY = 0,
  posZ = 0.5,
  rotX = Math.PI / 2,
  rotY = 0,
  rotZ = +Math.random().toFixed(3),
}: AnimateCards) {
  gsap.to(cardDeck.cards[index].model.position, {
    x: posX + +Math.random().toFixed(3) / 4,
    y: cardDeck.table.height + posY,
    z: posZ + +Math.random().toFixed(3) / 4,
    duration: duration,
    delay: index * duration,
  })
  gsap.to(cardDeck.cards[index].model.rotation, {
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
  orientZ = 0,
  posX = 0,
  posY = 0,
  posZ = 0.5,
  rotX = 0,
  rotY = 0,
  rotZ = 0,
}: AnimateCards) {
  gsap.to(cardDeck.cards[index].model.position, {
    x: posX,
    y: cardDeck.table.height + posY,
    z: posZ,
    duration: duration * 2,
    delay: cardsToDeal * duration + duration * 1.5,
  })
  gsap.to(cardDeck.cards[index].model.rotation, {
    x: Math.PI / 2,
    y: 0,
    z: 0 + orientZ,
    duration: duration * 2,
    delay: cardsToDeal * duration + duration * 1.5,
  })
  gsap.to(cardDeck.cards[index].model.position, {
    x: posX,
    y: posY + cardDeck.table.height + 1,
    z: posZ,
    duration: duration * 2,
    delay: cardsToDeal * duration + duration * 3,
  })
  gsap.to(cardDeck.cards[index].model.rotation, {
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
  posY = 0,
  posZ = 0,
}: {
  cardDeck: Deck
  index: number
  posX?: number
  posY?: number
  posZ?: number
}) {
  const randomZ = Math.random()
  gsap.to(cardDeck.cards[index].model.position, {
    x: 0 + posX,
    y: cardDeck.table.height + 0.28 + posY,
    z: -0.28 + posZ,
    duration: duration * 2,
    delay: cardsToDeal * duration + duration * 6,
  })
  gsap.to(cardDeck.cards[index].model.position, {
    x: posX,
    y: cardDeck.table.height + posY,
    z: posZ,
    duration: duration * 2,
    delay: cardsToDeal * duration + duration * 8,
  })

  gsap.to(cardDeck.cards[index].model.rotation, {
    x: -Math.PI / 2,
    y: 0,
    z: randomZ,
    duration: duration * 2,
    delay: cardsToDeal * duration + duration * 8,
  })
  // }
}
