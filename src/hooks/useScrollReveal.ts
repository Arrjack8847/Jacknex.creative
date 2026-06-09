import { useEffect, type RefObject } from 'react'
import { gsap, ScrollTrigger, registerGsapPlugins } from '../lib/gsap'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

function collectRevealTargets(scope: HTMLElement) {
  const selectors = [
    '[data-reveal]',
    'main > section',
    'article > header',
    'article > section',
    '.section-shell > header',
    '.section-shell > section',
    '.home-statement',
    '.home-featured',
    '.home-showreel',
    '.home-disciplines',
    '.home-about',
    '.media-frame',
  ].join(',')

  return gsap.utils
    .toArray<HTMLElement>(selectors, scope)
    .filter((element, index, elements) => {
      if (elements.indexOf(element) !== index) {
        return false
      }

      if (
        element.classList.contains('home-hero') ||
        element.closest('[data-no-reveal]') ||
        element.closest('[aria-modal="true"]')
      ) {
        return false
      }

      return true
    })
}

export function useScrollReveal(
  scopeRef: RefObject<HTMLElement | null>,
  resetKey: string,
) {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const scope = scopeRef.current

    if (!scope) {
      return undefined
    }

    registerGsapPlugins()

    const isMobile = window.matchMedia('(max-width: 639px)').matches
    const y = isMobile ? 18 : 34
    const blur = isMobile ? 3 : 8
    const duration = isMobile ? 0.55 : 0.82
    const targets = collectRevealTargets(scope)

    if (targets.length === 0) {
      return undefined
    }

    if (prefersReducedMotion || document.hidden) {
      gsap.set(targets, {
        clearProps: 'filter,opacity,transform,visibility,willChange',
      })

      return undefined
    }

    const showFinalState = () => {
      gsap.set(targets, {
        autoAlpha: 1,
        clearProps: 'willChange',
        filter: 'blur(0px)',
        y: 0,
      })
    }

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        return
      }

      showFinalState()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    if (document.hidden) {
      showFinalState()

      return () =>
        document.removeEventListener('visibilitychange', handleVisibilityChange)
    }

    let context: gsap.Context | undefined
    let initialRevealFrame: number | undefined
    let refreshFrame: number | undefined

    const setupFrame = window.requestAnimationFrame(() => {
      if (document.hidden) {
        showFinalState()
        return
      }

      context = gsap.context(() => {
        const initialTargets = targets.filter((target) => {
          const rect = target.getBoundingClientRect()
          return rect.top < window.innerHeight * 0.9 && rect.bottom > 0
        })
        const initialTargetSet = new Set(initialTargets)
        const delayedTargets = targets.filter(
          (target) => !initialTargetSet.has(target),
        )

        gsap.set(targets, {
          autoAlpha: 0,
          filter: `blur(${blur}px)`,
          y,
          willChange: 'transform, opacity, filter',
        })

        const revealTargets = (
          batch: Element[],
          stagger = isMobile ? 0.045 : 0.08,
        ) => {
          gsap.to(batch, {
            autoAlpha: 1,
            clearProps: 'willChange',
            duration,
            ease: 'power3.out',
            filter: 'blur(0px)',
            overwrite: true,
            stagger,
            visibility: 'visible',
            y: 0,
          })
        }

        if (initialTargets.length > 0) {
          initialRevealFrame = window.requestAnimationFrame(() => {
            revealTargets(initialTargets, isMobile ? 0.035 : 0.06)
          })
        }

        if (delayedTargets.length > 0) {
          ScrollTrigger.batch(delayedTargets, {
            batchMax: isMobile ? 3 : 5,
            interval: 0.08,
            once: true,
            onEnter: (batch) => {
              revealTargets(batch)
            },
            start: 'top 86%',
          })
        }
      }, scope)

      refreshFrame = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    })

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.cancelAnimationFrame(setupFrame)

      if (initialRevealFrame) {
        window.cancelAnimationFrame(initialRevealFrame)
      }

      if (refreshFrame) {
        window.cancelAnimationFrame(refreshFrame)
      }

      context?.revert()
    }
  }, [prefersReducedMotion, resetKey, scopeRef])
}
