import { Body, Box, Vec3, type World } from "cannon-es"
import {
  TextureLoader,
  type Group,
  type Scene,
  BufferGeometry,
  BufferAttribute,
  MeshStandardMaterial,
  Mesh,
} from "three"
import { GLTFLoader } from "three/examples/jsm/Addons.js"

export function puzzlePiece(scene: Scene, world: World) {
  type Puzzle = {
    model: Group
    body: Body
  }
  let puzzle: Puzzle[] = []
  const gltfLoader = new GLTFLoader()
  const textureLoader = new TextureLoader()

  const puzzleTexture = textureLoader.load("/public/images/nature.jpg")

  gltfLoader.load("/public/assets/Puzzle piece.gltf", (model) => {
    const puzzlePiece = model.scene

    puzzlePiece.traverse((child) => {
      child.castShadow = true
      child.receiveShadow = true
      //@ts-ignore
      if (child.isMesh) {
        //@ts-ignore
        child.material.map = puzzleTexture
        //@ts-ignore
        child.material.map.needsUpdate = true
      }
    })

    puzzlePiece.position.set(0, 4, 0)
    puzzlePiece.rotateY(5)
    scene.add(puzzlePiece)

    const body = new Body({
      mass: 1,
      shape: new Box(new Vec3(0.5, 0.5, 0.1)),
      position: new Vec3(0, 4, 0),
    })

    body.velocity.set(3, 3, 0)
    world.addBody(body)

    puzzle.push({ model: puzzlePiece, body: body })
  })

  return puzzle
}
