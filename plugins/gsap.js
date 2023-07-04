import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { Observer } from 'gsap/Observer'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Observer)

export default defineNuxtPlugin(() => {
  return {
    provide: {
      gsap: gsap,
      ScrollTrigger,
      ScrollSmoother,
      Observer,
    },
  }
})
