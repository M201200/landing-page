import {
  BoxGeometry,
  DoubleSide,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  Vector3,
} from "three"
import {
  mergeVertices,
  mergeGeometries,
} from "three/addons/utils/BufferGeometryUtils.js"
import { Vec3, Body, Box } from "cannon-es"

import type { PhysicalObject } from "../../types/3dObjects"

const params = {
  segments: 35,
  edgeRadius: 0.12,
  notchRadius: 0.15,
  notchDepth: 0.09,
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

export function dice({
  posX = 0,
  posY = 1,
  posZ = 0,
  scale = 0.4,
} = {}): PhysicalObject {
  const model = createDiceModel().clone()
  model.position.set(posX, posY, posZ)
  model.scale.set(scale, scale, scale)

  const body = new Body({
    mass: 0.3,
    shape: new Box(new Vec3(0.5 * scale, 0.5 * scale, 0.5 * scale)),
    sleepTimeLimit: 0.02,
  })

  body.position.set(model.position.x, model.position.y, model.position.z)
  body.quaternion.set(
    model.quaternion.x,
    model.quaternion.y,
    model.quaternion.z,
    model.quaternion.w
  )

  return { model, body }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

function createDiceGeometry() {
  let boxGeometry = new BoxGeometry(
    1,
    1,
    1,
    params.segments,
    params.segments,
    params.segments
  )

  const positionAttr = boxGeometry.attributes.position
  const subCubeHalfSize = 0.5 - params.edgeRadius

  for (let i = 0; i < positionAttr.count; i++) {
    let position = new Vector3().fromBufferAttribute(positionAttr, i)

    const subCube = new Vector3(
      Math.sign(position.x),
      Math.sign(position.y),
      Math.sign(position.z)
    ).multiplyScalar(subCubeHalfSize)
    const addition = new Vector3().subVectors(position, subCube)

    if (
      Math.abs(position.x) > subCubeHalfSize &&
      Math.abs(position.y) > subCubeHalfSize &&
      Math.abs(position.z) > subCubeHalfSize
    ) {
      addition.normalize().multiplyScalar(params.edgeRadius)
      position = subCube.add(addition)
    } else if (
      Math.abs(position.x) > subCubeHalfSize &&
      Math.abs(position.y) > subCubeHalfSize
    ) {
      addition.z = 0
      addition.normalize().multiplyScalar(params.edgeRadius)
      position.x = subCube.x + addition.x
      position.y = subCube.y + addition.y
    } else if (
      Math.abs(position.x) > subCubeHalfSize &&
      Math.abs(position.z) > subCubeHalfSize
    ) {
      addition.y = 0
      addition.normalize().multiplyScalar(params.edgeRadius)
      position.x = subCube.x + addition.x
      position.z = subCube.z + addition.z
    } else if (
      Math.abs(position.y) > subCubeHalfSize &&
      Math.abs(position.z) > subCubeHalfSize
    ) {
      addition.x = 0
      addition.normalize().multiplyScalar(params.edgeRadius)
      position.y = subCube.y + addition.y
      position.z = subCube.z + addition.z
    }

    const notchWave = (v: number) => {
      v = (1 / params.notchRadius) * v
      v = Math.PI * Math.max(-1, Math.min(1, v))
      return params.notchDepth * (Math.cos(v) + 1)
    }
    const notch = (pos: number[]) => notchWave(pos[0]) * notchWave(pos[1])

    const offset = 0.23

    if (position.y === 0.5) {
      position.y -= notch([position.x, position.z])
    } else if (position.x === 0.5) {
      position.x -= notch([position.y + offset, position.z + offset])
      position.x -= notch([position.y - offset, position.z - offset])
    } else if (position.z === 0.5) {
      position.z -= notch([position.x - offset, position.y + offset])
      position.z -= notch([position.x, position.y])
      position.z -= notch([position.x + offset, position.y - offset])
    } else if (position.z === -0.5) {
      position.z += notch([position.x + offset, position.y + offset])
      position.z += notch([position.x + offset, position.y - offset])
      position.z += notch([position.x - offset, position.y + offset])
      position.z += notch([position.x - offset, position.y - offset])
    } else if (position.x === -0.5) {
      position.x += notch([position.y + offset, position.z + offset])
      position.x += notch([position.y + offset, position.z - offset])
      position.x += notch([position.y, position.z])
      position.x += notch([position.y - offset, position.z + offset])
      position.x += notch([position.y - offset, position.z - offset])
    } else if (position.y === -0.5) {
      position.y += notch([position.x + offset, position.z + offset])
      position.y += notch([position.x + offset, position.z])
      position.y += notch([position.x + offset, position.z - offset])
      position.y += notch([position.x - offset, position.z + offset])
      position.y += notch([position.x - offset, position.z])
      position.y += notch([position.x - offset, position.z - offset])
    }

    positionAttr.setXYZ(i, position.x, position.y, position.z)
  }

  boxGeometry.deleteAttribute("normal")
  boxGeometry.deleteAttribute("uv")
  const diceGeometry = mergeVertices(boxGeometry)

  diceGeometry.computeVertexNormals()

  return diceGeometry
}

function createInnerDiceGeometry() {
  const baseGeometry = new PlaneGeometry(
    1 - 2 * params.edgeRadius,
    1 - 2 * params.edgeRadius
  )
  const offset = 0.48
  return mergeGeometries(
    [
      baseGeometry.clone().translate(0, 0, offset),
      baseGeometry.clone().translate(0, 0, -offset),
      baseGeometry
        .clone()
        .rotateX(0.5 * Math.PI)
        .translate(0, -offset, 0),
      baseGeometry
        .clone()
        .rotateX(0.5 * Math.PI)
        .translate(0, offset, 0),
      baseGeometry
        .clone()
        .rotateY(0.5 * Math.PI)
        .translate(-offset, 0, 0),
      baseGeometry
        .clone()
        .rotateY(0.5 * Math.PI)
        .translate(offset, 0, 0),
    ],
    false
  )
}

function createDiceModel() {
  const DiceMaterialOuter = new MeshStandardMaterial({
    color: 0xeeeeee,
  })
  const DiceMaterialInner = new MeshStandardMaterial({
    color: 0x000000,
    roughness: 0,
    metalness: 1,
    side: DoubleSide,
  })

  const diceModel = new Group()
  const innerMesh = new Mesh(createInnerDiceGeometry(), DiceMaterialInner)
  const outerMesh = new Mesh(createDiceGeometry(), DiceMaterialOuter)
  outerMesh.castShadow = true
  diceModel.add(innerMesh, outerMesh)

  return diceModel
}
