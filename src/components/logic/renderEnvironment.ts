import {
  AmbientLight,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Scene,
  ShadowMaterial,
  Vector3,
  WebGLRenderer,
} from "three"
import { World, Body, Plane, Vec3 } from "cannon-es"
// import { OrbitControls } from "three/addons/controls/OrbitControls.js"
// import CannonDebugger from "cannon-es-debugger"

import type { PhysicalObject } from "../../types/3dObjects"

const canvas = document.querySelector("canvas")!

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

export const renderer = new WebGLRenderer({
  alpha: true,
  antialias: true,
  canvas: canvas,
})

export const scene = new Scene()
export const camera = new PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  300
)
camera.position.set(0, 4, 0)
camera.lookAt(0, 0, 0)

export const ambientLight = new AmbientLight(0xffffff, 1)
scene.add(ambientLight)

export const topLight = new PointLight(0xffffff, 1000)
topLight.position.set(-8, 15, 5)
topLight.castShadow = true
topLight.shadow.mapSize.width = 4096
topLight.shadow.mapSize.height = 4096
topLight.shadow.camera.near = 5
topLight.shadow.camera.far = 400
topLight.shadow.bias = -0.00003
scene.add(topLight)

export const world = new World({
  allowSleep: true,
  gravity: new Vec3(0, -50, 0),
})
world.defaultContactMaterial.restitution = 0.3
world.defaultContactMaterial.contactEquationStiffness = 1e7
world.defaultContactMaterial.contactEquationRelaxation = 4

// export const cannonDebugger = new CannonDebugger(scene, world)
// export const controls = new OrbitControls(camera, renderer.domElement)
export const physicalObjectsStatic: PhysicalObject[] = []
export const physicalObjectsToAnimate: PhysicalObject[] = []
export const physicalObjectArraysToAnimate: PhysicalObject[][] = []

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

export function renderEnvironment() {
  renderer.shadowMap.enabled = true
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  updateSceneSize()
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
    camera: camera,
    world: world,
    objects: physicalObjectsToAnimate,
    objectArrays: physicalObjectArraysToAnimate,
  })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

export function updateSceneSize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

type AnimationParams = {
  scene: Scene
  camera: PerspectiveCamera
  world: World
  objects: PhysicalObject[]
  objectArrays: PhysicalObject[][]
}

function animationParams({
  scene,
  camera,
  world,
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
