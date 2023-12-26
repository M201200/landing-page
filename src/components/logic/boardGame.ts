import gsap from "gsap"
import type { BoardGameBundle, PhysicalObject } from "../../types/3dObjects"
import { Vec3 } from "cannon-es"

let RedPiece: PhysicalObject
let boardPath: { x: number; z: number }[]

export function boardGame(BoardGameBundle: BoardGameBundle) {
  RedPiece = BoardGameBundle.GamePieces.RedPiece
  boardPath = BoardGameBundle.Board.path

  addDiceEvents(BoardGameBundle.Dice)
  throwDice(BoardGameBundle.Dice)
}

function addDiceEvents(dice: PhysicalObject) {
  dice.body.addEventListener("sleep", (e: Event) => {
    dice.body.allowSleep = false

    const euler = new Vec3()
    //@ts-ignore
    e.target.quaternion.toEuler(euler)

    const eps = 0.5
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
  animateTurn({
    piece: RedPiece,
    pathIndex: score,
    duration: 0.8,
  })
}

type AnimateTurn = {
  piece: PhysicalObject
  pathIndex: number
  duration?: number
}

function animateTurn({ piece, pathIndex, duration = 1 }: AnimateTurn) {
  const timeline = gsap.timeline()
  timeline.to(piece.body.position, {
    x: piece.body.position.x,
    y: piece.body.position.y + 0.4,
    z: piece.body.position.z,
    duration: duration / 4,
  })
  timeline.to(piece.body.position, {
    x: boardPath[pathIndex].x,
    y: piece.body.position.y,
    z: boardPath[pathIndex].z,
    duration: duration,
  })
}

function throwDice(dice: PhysicalObject) {
  dice.body.velocity.setZero()
  dice.body.angularVelocity.setZero()

  dice.body.position.y += 1.6

  const force = 0.05 + Math.random() / 100
  dice.body.applyImpulse(
    new Vec3(force, force / 4, force),
    new Vec3(
      dice.body.position.x - 0.1,
      dice.body.position.y,
      dice.body.position.z - 0.2
    )
  )

  dice.body.allowSleep = true
}
