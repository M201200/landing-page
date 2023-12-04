import gsap from "gsap"
import type { PhysicalObject } from "../../types/3dObjects"
import { RedPieceInitialPosition } from "../complexObjects/BoardGameBundle"
import { Vec3 } from "cannon-es"

let RedPiece: PhysicalObject

export function boardGame(BoardGameBundle: PhysicalObject[]) {
  BoardGameBundle.forEach((object) => {
    if (object.model.name === "Dice") {
      addDiceEvents(object)
      throwDice(object)
    }
    if (object.model.name === "RedPiece") {
      RedPiece = object
    }
  })
}

function addDiceEvents(dice: PhysicalObject) {
  dice.body.addEventListener("sleep", (e: Event) => {
    dice.body.allowSleep = false

    const euler = new Vec3()
    //@ts-ignore
    e.target.quaternion.toEuler(euler)

    const eps = 0.3
    let isZero = (angle: number) => Math.abs(angle) < eps
    let isHalfPi = (angle: number) => Math.abs(angle - 0.5 * Math.PI) < eps
    let isMinusHalfPi = (angle: number) => Math.abs(0.5 * Math.PI + angle) < eps
    let isPiOrMinusPi = (angle: number) =>
      Math.abs(Math.PI - angle) < eps || Math.abs(Math.PI + angle) < eps

    if (isZero(euler.z)) {
      if (isZero(euler.x)) {
        MakeTurn(1)
      } else if (isHalfPi(euler.x)) {
        MakeTurn(4)
      } else if (isMinusHalfPi(euler.x)) {
        MakeTurn(3)
      } else if (isPiOrMinusPi(euler.x)) {
        MakeTurn(6)
      } else {
        dice.body.allowSleep = true
      }
    } else if (isHalfPi(euler.z)) {
      MakeTurn(2)
    } else if (isMinusHalfPi(euler.z)) {
      MakeTurn(5)
    } else {
      dice.body.allowSleep = true
    }
  })
}

function MakeTurn(score: number) {
  RedPiece.body.mass = 0
  switch (score) {
    case 1:
      {
        gsap
          .to(RedPiece.body.position, {
            x: RedPieceInitialPosition.x,
            y: RedPieceInitialPosition.y + 0.4,
            z: RedPieceInitialPosition.z,
          })
          .duration(0.1)
        gsap
          .to(RedPiece.body.position, {
            x: RedPieceInitialPosition.x - 0.05,
            y: RedPieceInitialPosition.y,
            z: RedPieceInitialPosition.z - 0.28,
          })
          .delay(0.1)
          .duration(0.4)
      }
      break
    case 2:
      {
        gsap
          .to(RedPiece.body.position, {
            x: RedPieceInitialPosition.x,
            y: RedPieceInitialPosition.y + 0.4,
            z: RedPieceInitialPosition.z,
          })
          .duration(0.2)
        gsap
          .to(RedPiece.body.position, {
            x: RedPieceInitialPosition.x - 0.1,
            y: RedPieceInitialPosition.y,
            z: RedPieceInitialPosition.z - 0.6,
          })
          .delay(0.2)
          .duration(0.6)
      }
      break
    case 3:
      {
        gsap
          .to(RedPiece.body.position, {
            x: RedPieceInitialPosition.x,
            y: RedPieceInitialPosition.y + 0.4,
            z: RedPieceInitialPosition.z,
          })
          .duration(0.2)
        gsap
          .to(RedPiece.body.position, {
            x: RedPieceInitialPosition.x - 0.1,
            y: RedPieceInitialPosition.y,
            z: RedPieceInitialPosition.z - 1,
          })
          .delay(0.2)
          .duration(1)
      }
      break
    case 4:
      {
        gsap
          .to(RedPiece.body.position, {
            x: RedPieceInitialPosition.x,
            y: RedPieceInitialPosition.y + 0.4,
            z: RedPieceInitialPosition.z,
          })
          .duration(0.2)
        gsap
          .to(RedPiece.body.position, {
            x: RedPieceInitialPosition.x - 0.1,
            y: RedPieceInitialPosition.y,
            z: RedPieceInitialPosition.z - 1.4,
          })
          .delay(0.2)
          .duration(1)
      }
      break
    case 5:
      {
        gsap
          .to(RedPiece.body.position, {
            x: RedPieceInitialPosition.x,
            y: RedPieceInitialPosition.y + 0.4,
            z: RedPieceInitialPosition.z,
          })
          .duration(0.2)
        gsap
          .to(RedPiece.body.position, {
            x: RedPieceInitialPosition.x,
            y: RedPieceInitialPosition.y,
            z: RedPieceInitialPosition.z - 1.6,
          })
          .delay(0.2)
          .duration(1)
      }
      break
    case 6:
      {
        gsap
          .to(RedPiece.body.position, {
            x: RedPieceInitialPosition.x,
            y: RedPieceInitialPosition.y + 0.4,
            z: RedPieceInitialPosition.z,
          })
          .duration(0.2)
        gsap
          .to(RedPiece.body.position, {
            x: RedPieceInitialPosition.x + 0.1,
            y: RedPieceInitialPosition.y,
            z: RedPieceInitialPosition.z - 2.2,
          })
          .delay(0.2)
          .duration(1)
      }
      break
  }
  RedPiece.body.mass = 0.2
}

function throwDice(dice: PhysicalObject) {
  dice.body.velocity.setZero()
  dice.body.angularVelocity.setZero()

  const force = 1 + Math.random()
  dice.body.applyImpulse(new Vec3(-force, force, 0), new Vec3(0, 0, 0.2))

  dice.body.allowSleep = true
}
