import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export default defineNuxtPlugin(() => {
  return {
    provide: {
      gsap: gsap,
      ScrollTrigger,
      ScrollSmoother,
    },
  }
})
