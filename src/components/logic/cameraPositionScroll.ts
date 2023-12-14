import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"

import { camera } from "./renderEnvironment"

export function cameraPositionScroll() {
  gsap.registerPlugin(ScrollTrigger)

  gsap.to(camera.position, {
    scrollTrigger: {
      trigger: "main",
      start: "top top",
      end: "bottom center",
      scrub: true,
    },
    z: 35,
  })
  // gsap.to(camera.position, {
  //   scrollTrigger: {
  //     trigger: ".game-links",
  //     start: "top center",
  //     end: "bottom center",
  //     scrub: 0.1,
  //   },
  //   z: 6,
  // })
}
