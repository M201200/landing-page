import { cardBox, cardBoxDepth, cardBoxSideHeight } from "../3dObjects/CardBox"
import {
  gameCard,
  gameCardParams,
  redCard,
  yellowCard,
  greenCard,
  blueCard,
} from "../3dObjects/GameCard"
import type { GameCard } from "../../types/3dObjects"
import {
  cardTable,
  cardTableHeight,
  cardTableRadius,
} from "../3dObjects/CardTable"

export function deck({ posZ = 0, scale = 1 } = {}) {
  const offsetXZ = (cardBoxDepth * scale) / 2
  const offsetY = (cardBoxSideHeight * scale) / 2 + offsetXZ
  const position = cardTableRadius * 0.72
  const cardPositionX = position - offsetXZ
  const cardPositionZ = posZ + position / 1.8 - offsetXZ
  const cards: GameCard[] = []

  for (let i = 0; i < 10; i++) {
    cards.push(
      gameCard({
        faceColor: redCard,
        number: i,
        posX: cardPositionX,
        posY:
          cardTableHeight + gameCardParams.depth * scale * (i + 1) - offsetY,
        posZ: cardPositionZ,
        scale: scale,
      })
    )
    cards.push(
      gameCard({
        faceColor: yellowCard,
        number: i,
        posX: cardPositionX,
        posY:
          cardTableHeight + gameCardParams.depth * scale * (i + 11) - offsetY,
        posZ: cardPositionZ,
        scale: scale,
      })
    )
    cards.push(
      gameCard({
        faceColor: greenCard,
        number: i,
        posX: cardPositionX,
        posY:
          cardTableHeight + gameCardParams.depth * scale * (i + 21) - offsetY,
        posZ: cardPositionZ,
        scale: scale,
      })
    )
    cards.push(
      gameCard({
        faceColor: blueCard,
        number: i,
        posX: cardPositionX,
        posY:
          cardTableHeight + gameCardParams.depth * scale * (i + 31) - offsetY,
        posZ: cardPositionZ,
        scale: scale,
      })
    )
  }
  const box = cardBox({
    posX: position,
    posY: cardTableHeight,
    posZ: posZ + position / 1.8,
    scale,
  })
  const table = cardTable({ posY: -7, posZ })

  return { cards, box, table }
}
