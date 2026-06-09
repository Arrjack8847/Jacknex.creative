import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let pluginsRegistered = false

export function registerGsapPlugins() {
  if (pluginsRegistered) {
    return
  }

  gsap.registerPlugin(ScrollTrigger)
  pluginsRegistered = true
}

export { gsap, ScrollTrigger }
