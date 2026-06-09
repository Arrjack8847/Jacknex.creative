import { useEffect } from 'react'
import { gsap, registerGsapPlugins } from '../lib/gsap'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export function useMagneticInteractions() {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined
    }

    const canUseMagnet = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (min-width: 1024px)',
    ).matches

    if (!canUseMagnet) {
      return undefined
    }

    registerGsapPlugins()

    const targets = gsap.utils.toArray<HTMLElement>(
      '.premium-button, .social-link-premium',
    )

    const cleanups = targets.map((target) => {
      const moveX = gsap.quickTo(target, 'x', {
        duration: 0.34,
        ease: 'power3.out',
      })

      const moveY = gsap.quickTo(target, 'y', {
        duration: 0.34,
        ease: 'power3.out',
      })

      const scale = gsap.quickTo(target, 'scale', {
        duration: 0.28,
        ease: 'power3.out',
      })

      const handlePointerMove = (event: PointerEvent) => {
        const rect = target.getBoundingClientRect()
        const strength = target.classList.contains('premium-button')
          ? 0.16
          : 0.22

        moveX((event.clientX - rect.left - rect.width / 2) * strength)
        moveY((event.clientY - rect.top - rect.height / 2) * strength)
        scale(1.025)
      }

      const handlePointerLeave = () => {
        moveX(0)
        moveY(0)
        scale(1)
      }

      target.addEventListener('pointermove', handlePointerMove)
      target.addEventListener('pointerleave', handlePointerLeave)

      return () => {
        target.removeEventListener('pointermove', handlePointerMove)
        target.removeEventListener('pointerleave', handlePointerLeave)
        gsap.set(target, {
          clearProps: 'transform',
        })
      }
    })

    return () => {
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [prefersReducedMotion])
}
