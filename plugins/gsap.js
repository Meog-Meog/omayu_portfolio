import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { Observer } from 'gsap/Observer'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Observer, ScrollToPlugin)

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
