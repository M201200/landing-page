import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import type { Camera, PointLight } from "three"

export function scenePositionScroll(camera: Camera, light: PointLight) {
  gsap.registerPlugin(ScrollTrigger)

  const timeline = gsap.timeline()
  gsap.to(light.position, {
    scrollTrigger: {
      trigger: "main",
      start: "top top",
      end: "bottom center",
      scrub: true,
    },
    x: 8,
    y: 20,
    z: 70,
  })

  timeline
    .to(camera.position, {
      scrollTrigger: {
        trigger: ".welcome-screen",
        start: "top top",
        endTrigger: ".game-links",
        end: "bottom center",
        scrub: true,
      },
      z: 8,
    })
    .to(camera.position, {
      scrollTrigger: {
        trigger: ".game-links",
        start: "top top",
        end: "bottom center",
        scrub: true,
      },
      z: 10,
      onUpdate: function () {
        camera.position.z = this.progress() * (10 - 8) + 8
      },
    })
    .to(camera.position, {
      scrollTrigger: {
        trigger: ".jigsaw-text",
        start: "top top",
        endTrigger: "#jigsaw",
        end: "center center",
        scrub: true,
      },
      z: 25,
      onUpdate: function () {
        camera.position.z = this.progress() * (25 - 10) + 10
      },
    })
    .to(camera.position, {
      scrollTrigger: {
        trigger: "#jigsaw",
        start: "top center",
        end: "center center",
        scrub: true,
      },
      y: 4,
    })
    .to(camera.rotation, {
      scrollTrigger: {
        trigger: "#jigsaw",
        start: "top center",
        end: "center center",
        scrub: true,
      },
      x: -Math.PI / 3,
      y: 0,
      z: 0,
    })
    .to(camera.position, {
      scrollTrigger: {
        trigger: "#jigsaw",
        start: "center center",
        endTrigger: "#board",
        end: "center center",
        scrub: true,
      },
      z: 55,
      onUpdate: function () {
        camera.position.z = this.progress() * (55 - 25) + 25
      },
    })
    .to(camera.position, {
      scrollTrigger: {
        trigger: "#board",
        start: "center center",
        endTrigger: "#cards",
        end: "center center",
        scrub: true,
      },
      z: 85,
      onUpdate: function () {
        camera.position.z = this.progress() * (85 - 55) + 55
      },
    })
}
