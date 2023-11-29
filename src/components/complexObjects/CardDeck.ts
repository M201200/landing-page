import { Mesh, Group } from "three"
import { gameCard } from "../3dObjects/GameCard"
import type { Body } from "cannon-es"

type PhysicalObject = {
  model: Group | Mesh
  body: Body
}

export function cardDeck() {
  const deck: PhysicalObject[] = []

  for (let i = 0; i < 10; i++) {
    deck.push(
      gameCard({
        facePath: `./public/images/cards/${i}-red.jpg`,
        posX: -3 + i * 0.6,
        posZ: -2,
      })
    )
    deck.push(
      gameCard({
        facePath: `./public/images/cards/${i}-green.jpg`,
        posX: -3 + i * 0.6,
        posZ: -1,
      })
    )
    deck.push(
      gameCard({
        facePath: `./public/images/cards/${i}-yellow.jpg`,
        posX: -3 + i * 0.6,
        posZ: 0,
      })
    )
    deck.push(
      gameCard({
        facePath: `./public/images/cards/${i}-blue.jpg`,
        posX: -3 + i * 0.6,
        posZ: 1,
      })
    )
  }

  return deck
}
