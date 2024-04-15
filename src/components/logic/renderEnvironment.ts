import {
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShadowMaterial,
  Vector3,
  WebGLRenderer,
} from "three"
import { World, Body, Plane } from "cannon-es"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
// import CannonDebugger from "cannon-es-debugger"

import type { PhysicalObject } from "../../types/3dObjects"

type RenderEnvironment = {
  renderer: WebGLRenderer
  scene: Scene
  world: World
  camera: PerspectiveCamera
  physicalObjectsStatic?: PhysicalObject[]
  physicalObjectsToAnimate?: PhysicalObject[]
  physicalObjectArraysToAnimate?: PhysicalObject[][]
}

// export const cannonDebugger = new CannonDebugger(scene, world)
export let renderEnvironmentIsDone = false

export function renderEnvironment({
  renderer,
  scene,
  world,
  camera,
  physicalObjectsStatic = [],
  physicalObjectsToAnimate = [],
  physicalObjectArraysToAnimate = [],
}: RenderEnvironment) {
  renderer.shadowMap.enabled = true
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // const controls = new OrbitControls(camera, renderer.domElement)
  updateSceneSize(camera, renderer)
  // controls.update()

  const floor = new Mesh(
    new PlaneGeometry(1000, 1000),
    new ShadowMaterial({
      opacity: 0.15,
    })
  )
  floor.receiveShadow = true
  floor.position.set(0, -7, 0)
  floor.quaternion.setFromAxisAngle(new Vector3(-1, 0, 0), Math.PI / 2)
  scene.add(floor)

  const floorBody = new Body({
    type: Body.STATIC,
    shape: new Plane(),
  })
  floorBody.position.set(floor.position.x, floor.position.y, floor.position.z)
  floorBody.quaternion.set(
    floor.quaternion.x,
    floor.quaternion.y,
    floor.quaternion.z,
    floor.quaternion.w
  )
  world.addBody(floorBody)

  if (physicalObjectsStatic?.length) {
    physicalObjectsStatic.forEach((object) => {
      scene.add(object.model)
      world.addBody(object.body)
    })
  }

  if (physicalObjectsToAnimate?.length) {
    physicalObjectsToAnimate.forEach((object) => {
      scene.add(object.model)
      world.addBody(object.body)
    })
  }

  if (physicalObjectArraysToAnimate?.length) {
    physicalObjectArraysToAnimate.forEach((array) => {
      array.forEach((object) => {
        scene.add(object.model)
        world.addBody(object.body)
      })
    })
  }

  animationParams({
    scene: scene,
    world: world,
    renderer: renderer,
    camera: camera,
    // controls: controls,
    objects: physicalObjectsToAnimate,
    objectArrays: physicalObjectArraysToAnimate,
  })

  renderEnvironmentIsDone = true
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

export function updateSceneSize(
  camera: PerspectiveCamera,
  renderer: WebGLRenderer
) {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

type AnimationParams = {
  scene: Scene
  world: World
  renderer: WebGLRenderer
  camera: PerspectiveCamera
  // controls: OrbitControls
  objects: PhysicalObject[]
  objectArrays: PhysicalObject[][]
}

function animationParams({
  scene,
  world,
  renderer,
  camera,
  // controls,
  objects,
  objectArrays,
}: AnimationParams) {
  function animate() {
    world.fixedStep()

    if (objects?.length) {
      objects.forEach((object) => {
        object.model.position.set(
          object.body.position.x,
          object.body.position.y,
          object.body.position.z
        )
        object.model.quaternion.set(
          object.body.quaternion.x,
          object.body.quaternion.y,
          object.body.quaternion.z,
          object.body.quaternion.w
        )
      })
    }

    if (objectArrays?.length) {
      objectArrays.forEach((array) =>
        array.forEach((object) => {
          object.model.position.set(
            object.body.position.x,
            object.body.position.y,
            object.body.position.z
          )
          object.model.quaternion.set(
            object.body.quaternion.x,
            object.body.quaternion.y,
            object.body.quaternion.z,
            object.body.quaternion.w
          )
        })
      )
    }

    // cannonDebugger.update()
    // controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }

  animate()
}
