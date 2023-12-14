import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"

export function mainScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger)

  gsap.to("main", {
    scrollTrigger: {
      trigger: ".game-links",
      start: "top center",
      end: "bottom center",
      scrub: 0.2,
    },
    backgroundColor: "#fee8ff",
  })
  gsap.to("main", {
    scrollTrigger: {
      trigger: ".jigsaw-text",
      start: "top center",
      end: "bottom center",
      scrub: 0.2,
    },
    backgroundColor: "#95e08b",
  })
  gsap.to("main", {
    scrollTrigger: {
      trigger: "#jigsaw",
      start: "top center",
      end: "bottom center",
      scrub: 0.2,
    },
    backgroundColor: "#ede47d",
  })
  gsap.to("main", {
    scrollTrigger: {
      trigger: ".board-text",
      start: "top center",
      end: "bottom center",
      scrub: 0.2,
    },
    backgroundColor: "#e28f87",
  })
  gsap.to("main", {
    scrollTrigger: {
      trigger: "#board",
      start: "top center",
      end: "bottom center",
      scrub: 0.2,
    },
    backgroundColor: "#d09db6",
  })
  gsap.to("main", {
    scrollTrigger: {
      trigger: ".cards-text",
      start: "top center",
      end: "bottom center",
      scrub: 0.2,
    },
    backgroundColor: "#6dfa6e",
  })
  gsap.to("main", {
    scrollTrigger: {
      trigger: "#cards",
      start: "top center",
      end: "bottom center",
      scrub: 0.2,
    },
    backgroundColor: "#fec47f",
  })
}
