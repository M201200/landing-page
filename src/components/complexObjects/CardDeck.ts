import { gameCard, gameCardParams } from "../3dObjects/GameCard"
import type { GameCard, PhysicalObject } from "../../types/3dObjects"
import { tableHeight } from "../3dObjects/Table"

export const redCard = "E61010"
export const yellowCard = "FBB500"
export const greenCard = "23AC01"
export const blueCard = "152AEB"

export function cardDeck() {
  const deck: GameCard[] = []

  for (let i = 0; i < 10; i++) {
    deck.push(
      gameCard({
        faceColor: redCard,
        number: i,
        posX: 3,
        posY: tableHeight + gameCardParams.depth * 1.1 * (i + 1),
        posZ: 3,
      })
    )
    deck.push(
      gameCard({
        faceColor: yellowCard,
        number: i,
        posX: 3,
        posY: tableHeight + gameCardParams.depth * 1.1 * (i + 11),
        posZ: 3,
      })
    )
    deck.push(
      gameCard({
        faceColor: greenCard,
        number: i,
        posX: 3,
        posY: tableHeight + gameCardParams.depth * 1.1 * (i + 21),
        posZ: 3,
      })
    )
    deck.push(
      gameCard({
        faceColor: blueCard,
        number: i,
        posX: 3,
        posY: tableHeight + gameCardParams.depth * 1.1 * (i + 31),
        posZ: 3,
      })
    )
  }
  return deck
}
