export function cardBackgroundTemplate({
  background = "161617",
  foreground = "d82c07",
} = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"><rect width="200" height="300" rx="0" ry="0" fill="#${background}" stroke-width="0"/><path d="M9.39332,72.65461c0-33.70121,14.04763-61.02143,31.37627-61.02143s31.37627,27.32023,31.37627,61.02144-14.04763,61.02144-31.37627,61.02144-31.37627-27.32023-31.37627-61.02143v-.00002Z" transform="matrix(2.247085 1.14854-1.128652 2.208175 90.388994-57.259581)" fill="#${foreground}" stroke-width="0"/></svg>`
}
