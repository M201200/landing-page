import { cardBox } from "../3dObjects/CardBox"
import {
  gameCard,
  redCard,
  yellowCard,
  greenCard,
  blueCard,
} from "../3dObjects/GameCard"
import type { Deck, GameCard } from "../../types/3dObjects"
import { cardTable } from "../3dObjects/CardTable"

export function deck({ posZ = 0, scale = 1 } = {}): Deck {
  const table = cardTable({ posY: -7, posZ })
  const card = gameCard({ scale: scale })

  const deckSize = 40
  const offsetXZ = (card.params.depth * scale) / 2
  const offsetY = (card.params.depth * deckSize * 1.02 * scale) / 2 + offsetXZ
  const position = table.radius * 0.72
  const cardPositionX = position - offsetXZ
  const cardPositionZ = posZ + position / 1.8 - offsetXZ
  const cards: GameCard[] = []
  const box = cardBox({
    posX: position,
    posY: table.height,
    posZ: posZ + position / 1.8,
    cardParams: card.params,
    deckSize: deckSize,
    scale,
  })

  for (let i = 0; i < 10; i++) {
    cards.push(
      gameCard({
        faceColor: redCard,
        number: i,
        posX: cardPositionX,
        posY: table.height + card.params.depth * scale * (i + 1) - offsetY,
        posZ: cardPositionZ,
        scale: scale,
      })
    )
    cards.push(
      gameCard({
        faceColor: yellowCard,
        number: i,
        posX: cardPositionX,
        posY: table.height + card.params.depth * scale * (i + 11) - offsetY,
        posZ: cardPositionZ,
        scale: scale,
      })
    )
    cards.push(
      gameCard({
        faceColor: greenCard,
        number: i,
        posX: cardPositionX,
        posY: table.height + card.params.depth * scale * (i + 21) - offsetY,
        posZ: cardPositionZ,
        scale: scale,
      })
    )
    cards.push(
      gameCard({
        faceColor: blueCard,
        number: i,
        posX: cardPositionX,
        posY: table.height + card.params.depth * scale * (i + 31) - offsetY,
        posZ: cardPositionZ,
        scale: scale,
      })
    )
  }
  return { cards, box, table }
}
