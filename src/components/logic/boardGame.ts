import gsap from "gsap"
import type { PhysicalObject } from "../../types/3dObjects"
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
        animateTurn({
          piece: RedPiece,
          offsetX: -0.05,
          offsetY: 0.4,
          offsetZ: -0.28,
          duration: 0.4,
        })
      }
      break
    case 2:
      {
        animateTurn({
          piece: RedPiece,
          offsetX: -0.1,
          offsetY: 0.4,
          offsetZ: -0.6,
          duration: 0.6,
        })
      }
      break
    case 3:
      {
        animateTurn({
          piece: RedPiece,
          offsetX: -0.1,
          offsetY: 0.4,
          offsetZ: -1,
        })
      }
      break
    case 4:
      {
        animateTurn({
          piece: RedPiece,
          offsetX: -0.1,
          offsetY: 0.4,
          offsetZ: -1.4,
        })
      }
      break
    case 5:
      {
        animateTurn({
          piece: RedPiece,
          offsetX: 0,
          offsetY: 0.4,
          offsetZ: -1.6,
        })
      }
      break
    case 6:
      {
        animateTurn({
          piece: RedPiece,
          offsetX: +0.1,
          offsetY: 0.4,
          offsetZ: -2.2,
        })
      }
      break
  }
  RedPiece.body.mass = 0.2
}

type AnimateTurn = {
  piece: PhysicalObject
  offsetX: number
  offsetY: number
  offsetZ: number
  duration?: number
}

function animateTurn({
  piece,
  offsetX,
  offsetY,
  offsetZ,
  duration = 1,
}: AnimateTurn) {
  const timeline = gsap.timeline()
  timeline.to(piece.body.position, {
    x: piece.body.position.x,
    y: piece.body.position.y + offsetY,
    z: piece.body.position.z,
    duration: duration / 4,
  })
  timeline.to(piece.body.position, {
    x: piece.body.position.x + offsetX,
    y: piece.body.position.y,
    z: piece.body.position.z + offsetZ,
    duration: duration,
  })
}

function throwDice(dice: PhysicalObject) {
  dice.body.velocity.setZero()
  dice.body.angularVelocity.setZero()

  const force = 1 + Math.random()
  dice.body.applyImpulse(
    new Vec3(-force, force, 0),
    new Vec3(
      dice.body.position.x,
      dice.body.position.y,
      dice.body.position.z + 0.2
    )
  )

  dice.body.allowSleep = true
}
