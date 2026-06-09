import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, registerGsapPlugins } from '../lib/gsap'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export function useLenisScroll() {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    registerGsapPlugins()

    const desktopMotionQuery = window.matchMedia(
      '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
    )

    if (
      prefersReducedMotion ||
      document.hidden ||
      !desktopMotionQuery.matches
    ) {
      document.documentElement.classList.remove('lenis-active')
      return undefined
    }

    const lenis = new Lenis({
      duration: 1.08,
      easing: (time: number) => Math.min(1, 1.001 - 2 ** (-10 * time)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
      wheelMultiplier: 0.9,
    })

    const updateScrollTrigger = () => ScrollTrigger.update()
    const tick = (time: number) => lenis.raf(time * 1000)

    document.documentElement.classList.add('lenis-active')
    lenis.on('scroll', updateScrollTrigger)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', updateScrollTrigger)
      gsap.ticker.remove(tick)
      lenis.destroy()
      document.documentElement.classList.remove('lenis-active')
      ScrollTrigger.update()
    }
  }, [prefersReducedMotion])
}
