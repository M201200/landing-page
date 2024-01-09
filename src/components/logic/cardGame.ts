import gsap from "gsap"
import type { Deck } from "../../types/3dObjects"
import { shuffleArray } from "./shuffleArray"

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
  const tableRadius = cardDeck.table.radius
  const handOffset = tableRadius * 0.68

  const duration = 0.5

  shuffleArray(cardDeck.cards)

  cardDeck.cards.forEach((card, idx) => {
    card.model.position.y =
      cardDeck.table.height +
      card.params.depth * scale * 20 -
      card.params.depth * scale * (idx + 1)
  })

  cardDeck.cards.forEach((card) => {
    gsap.to(card.model.position, {
      y: card.model.position.y + 1,
      delay: duration,
      duration: duration,
    })
    gsap.to(card.model.position, {
      z: card.model.position.z - cardParams.height / 1.8,
      delay: duration * 2,
      duration: duration,
    })
    gsap.to(card.model.position, {
      y: card.model.position.y,
      z: card.model.position.z,
      delay: duration * 3.2,
      duration: duration,
    })
  })

  gsap.to(cardDeck.box.position, {
    y: cardDeck.box.position.y + 1,
    delay: duration,
    duration: duration,
  })
  gsap.to(cardDeck.box.position, {
    z: cardDeck.box.position.z + cardParams.height / 1.8,
    delay: duration * 2,
    duration: duration,
  })
  gsap.to(cardDeck.box.position, {
    x: cardDeck.box.position.x - tableRadius * 1.4,
    y: cardDeck.box.position.y - 1,
    z: cardDeck.box.position.z - cardParams.height / 2,
    delay: duration * 3,
    duration: duration,
  })
  gsap
    .to(cardDeck.box.rotation, {
      y: Math.random() * 3,
      delay: duration * 3,
      duration: duration,
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
            posZ: posZ + handOffset,
          })
          startGame({
            cardDeck: cardDeck,
            index: i,
            posX: posX - offset + firstDeck * multiplier,
            posZ: posZ + handOffset + firstDeck * cardParams.depth,
            rotX: -Math.PI / 4,
            rotZ: Math.PI / 4 - firstDeck * 0.2,
          })
        }
        if (i % 4 === 1 && i !== cardsToDeal) {
          secondDeck++

          moveCard({
            cardDeck: cardDeck,
            index: i,
            posX: posX + handOffset,
            posY: secondDeck * cardParams.depth,
            posZ: posZ,
            orientZ: -Math.PI / 2,
          })
          startGame({
            cardDeck: cardDeck,
            index: i,
            posX: posX + handOffset + secondDeck * cardParams.depth,
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
            posZ: posZ - handOffset,
            orientZ: Math.PI,
          })
          startGame({
            cardDeck: cardDeck,
            index: i,
            posX: posX - offset + thirdDeck * multiplier,
            posZ: posZ - handOffset - thirdDeck * cardParams.depth,
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
            posX: posX - handOffset,
            posY: fourthDeck * cardParams.depth,
            posZ: posZ,
            orientZ: Math.PI / 2,
          })
          startGame({
            cardDeck: cardDeck,
            index: i,
            posX: posX - handOffset + fourthDeck * cardParams.depth,
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
  rotZ = Math.random(),
}: AnimateCards) {
  gsap.to(cardDeck.cards[index].model.position, {
    x: posX + Math.random() / 4,
    y: cardDeck.table.height + posY,
    z: posZ + Math.random() / 4,
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
    z: Math.random(),
    duration: duration * 2,
    delay: cardsToDeal * duration + duration * 8,
  })
}
