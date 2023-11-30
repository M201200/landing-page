import { Vec3 } from "cannon-es"
import type { PhysicalObject } from "../../types/3dObjects"

export function addDiceEvents(dice: PhysicalObject) {
  dice.body.addEventListener("sleep", (e: Event) => {
    dice.body.allowSleep = false

    const euler = new Vec3()
    //@ts-ignore
    e.target.quaternion.toEuler(euler)

    const eps = 0.1
    let isZero = (angle: number) => Math.abs(angle) < eps
    let isHalfPi = (angle: number) => Math.abs(angle - 0.5 * Math.PI) < eps
    let isMinusHalfPi = (angle: number) => Math.abs(0.5 * Math.PI + angle) < eps
    let isPiOrMinusPi = (angle: number) =>
      Math.abs(Math.PI - angle) < eps || Math.abs(Math.PI + angle) < eps

    if (isZero(euler.z)) {
      if (isZero(euler.x)) {
        applyRollResults(1)
      } else if (isHalfPi(euler.x)) {
        applyRollResults(4)
      } else if (isMinusHalfPi(euler.x)) {
        applyRollResults(3)
      } else if (isPiOrMinusPi(euler.x)) {
        applyRollResults(6)
      } else {
        // landed on edge => wait to fall on side and fire the event again
        dice.body.allowSleep = true
      }
    } else if (isHalfPi(euler.z)) {
      applyRollResults(2)
    } else if (isMinusHalfPi(euler.z)) {
      applyRollResults(5)
    } else {
      // landed on edge => wait to fall on side and fire the event again
      dice.body.allowSleep = true
    }
  })
}

export function applyRollResults(score: number) {
  return score
}

export function throwDice(dice: PhysicalObject) {
  dice.body.velocity.setZero()
  dice.body.angularVelocity.setZero()

  dice.body.position = new Vec3(4, 0, -0.5)
  dice.model.position.set(
    dice.body.position.x,
    dice.body.position.y,
    dice.body.position.z
  )

  dice.model.rotation.set(
    2 * Math.PI * Math.random(),
    0,
    2 * Math.PI * Math.random()
  )
  dice.body.quaternion.set(
    dice.model.quaternion.x,
    dice.model.quaternion.y,
    dice.model.quaternion.z,
    dice.model.quaternion.w
  )

  const force = 1 + 2 * Math.random()
  dice.body.applyImpulse(new Vec3(-force, force, 0), new Vec3(0, 0, 0.2))

  dice.body.allowSleep = true
}
