import { useEffect, type RefObject } from 'react'
import { gsap, registerGsapPlugins } from '../lib/gsap'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export function useHomeHeroAnimation(
  scopeRef: RefObject<HTMLElement | null>,
) {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const scope = scopeRef.current

    if (!scope) {
      return undefined
    }

    registerGsapPlugins()

    const isMobile = window.matchMedia('(max-width: 639px)').matches
    let removeVisibilityListener: (() => void) | undefined
    const context = gsap.context((self) => {
      const selector = self.selector

      if (!selector) {
        return
      }

      const label = selector('.home-hero-label')
      const titleLines = selector('[data-hero-line]')
      const description = selector('.home-hero-description')
      const actions = selector('.home-hero-actions > *')
      const footer = selector('.home-hero-footer')
      const media = selector('.home-hero-media')
      const revealItems = [label, titleLines, description, actions, footer]

      if (prefersReducedMotion || document.hidden) {
        gsap.set(revealItems, {
          clearProps: 'clipPath,opacity,transform,visibility',
        })

        gsap.set(media, {
          clearProps: '--hero-media-scale',
        })

        return
      }

      const showFinalState = () => {
        gsap.set(revealItems, {
          autoAlpha: 1,
          clipPath: 'inset(0 0 0% 0)',
          y: 0,
        })
      }

      const handleVisibilityChange = () => {
        if (document.hidden) {
          showFinalState()
        }
      }

      document.addEventListener('visibilitychange', handleVisibilityChange)
      removeVisibilityListener = () =>
        document.removeEventListener(
          'visibilitychange',
          handleVisibilityChange,
        )

      if (document.hidden) {
        showFinalState()

        return
      }

      gsap.set(revealItems, {
        autoAlpha: 0,
        y: isMobile ? 14 : 24,
      })

      gsap.set(titleLines, {
        clipPath: 'inset(0 0 100% 0)',
      })

      const mediaElement = media[0] as HTMLElement | undefined
      const baseScale = mediaElement
        ? Number(
            window
              .getComputedStyle(mediaElement)
              .getPropertyValue('--hero-media-scale'),
          ) || 1
        : 1
      const zoomScale = baseScale * (isMobile ? 1.025 : 1.055)

      gsap.set(media, {
        '--hero-media-scale': baseScale,
      })

      const timeline = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      })

      timeline
        .to(
          media,
          {
            '--hero-media-scale': zoomScale,
            duration: isMobile ? 2.2 : 3.8,
            ease: 'power1.out',
          },
          0,
        )
        .to(
          label,
          {
            autoAlpha: 1,
            duration: 0.5,
            y: 0,
          },
          0.08,
        )
        .to(
          titleLines,
          {
            autoAlpha: 1,
            clipPath: 'inset(0 0 0% 0)',
            duration: isMobile ? 0.62 : 0.76,
            stagger: isMobile ? 0.08 : 0.11,
            y: 0,
          },
          0.18,
        )
        .to(
          description,
          {
            autoAlpha: 1,
            duration: 0.62,
            y: 0,
          },
          isMobile ? 0.78 : 0.92,
        )
        .to(
          actions,
          {
            autoAlpha: 1,
            duration: 0.5,
            stagger: 0.08,
            y: 0,
          },
          isMobile ? 0.92 : 1.08,
        )
        .to(
          footer,
          {
            autoAlpha: 1,
            duration: 0.5,
            y: 0,
          },
          isMobile ? 1.04 : 1.2,
        )
    }, scope)

    return () => {
      removeVisibilityListener?.()
      context.revert()
    }
  }, [prefersReducedMotion, scopeRef])
}
