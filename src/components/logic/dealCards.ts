import gsap from "gsap"
import type { Deck } from "../../types/3dObjects"
import { shuffleArray } from "./shuffleArray"

const duration = 0.2
const cardsToDeal = 28

let firstDeck = 0
let secondDeck = 0
let thirdDeck = 0
let fourthDeck = 0

export function dealCards(
  cardDeck: Deck,
  { posX = 0, posZ = 0, scale = 1 } = {}
) {
  const cardParams = cardDeck.cards[0].params
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
