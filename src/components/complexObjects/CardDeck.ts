import { gameCard } from "../3dObjects/GameCard"
import type { PhysicalObject } from "../../types/3dObjects"

export function cardDeck() {
  const deck: PhysicalObject[] = []
  const red = "E61010"
  const yellow = "FBB500"
  const green = "23AC01"
  const blue = "152AEB"

  for (let i = 0; i < 10; i++) {
    deck.push(
      gameCard({
        faceColor: red,
        number: i,
        posX: -3 + i * 0.6,
        posZ: -2,
      })
    )
    deck.push(
      gameCard({
        faceColor: yellow,
        number: i,
        posX: -3 + i * 0.6,
        posZ: -1,
      })
    )
    deck.push(
      gameCard({
        faceColor: green,
        number: i,
        posX: -3 + i * 0.6,
        posZ: 0,
      })
    )
    deck.push(
      gameCard({
        faceColor: blue,
        number: i,
        posX: -3 + i * 0.6,
        posZ: 1,
      })
    )
  }

  return deck
}
