import { Mesh, Group } from "three"

import { Body } from "cannon-es"

export type PhysicalObject = {
  model: Group | Mesh
  body: Body
}
