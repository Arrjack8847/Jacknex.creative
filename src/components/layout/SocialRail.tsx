import { useEffect, useRef, useState } from 'react'
import { SocialLinks } from '../common/SocialLinks'
import { socialLinks } from '../../data/socialLinks'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../lib/cn'
import { gsap, registerGsapPlugins } from '../../lib/gsap'

type SocialLink = (typeof socialLinks)[number]

const positionClasses = cn(
  // Mobile position
  'left-2 bottom-20',

  // Small mobile and tablet
  'sm:left-3 sm:bottom-20',
  'md:left-4 md:bottom-8',

  // Laptop and desktop
  'lg:left-5 lg:bottom-10',
  'xl:left-7 xl:bottom-10',
  '2xl:left-9 2xl:bottom-12',
)

const railLinks: SocialLink[] = socialLinks.filter((link: SocialLink) => {
  const href = link.href.trim()

  return href.length > 0 && href !== '#'
})

export function SocialRail() {
  const railRef = useRef<HTMLElement>(null)

  const prefersReducedMotion = usePrefersReducedMotion()

  const [isMobileRailVisible, setIsMobileRailVisible] = useState(false)

  const hasRailLinks = railLinks.length > 0

  /*
   * Mobile scroll behaviour:
   *
   * 1. Hide the social rail inside the first hero section.
   * 2. Reveal it after the user scrolls past most of the first screen.
   * 3. Tablet and desktop remain visible at all times.
   */
  useEffect(() => {
    const updateMobileVisibility = () => {
      const isMobile = window.innerWidth < 768

      if (!isMobile) {
        setIsMobileRailVisible(true)
        return
      }

      // Reveal after scrolling through approximately 75% of the hero screen.
      const revealPoint = window.innerHeight * 0.75

      setIsMobileRailVisible(window.scrollY >= revealPoint)
    }

    updateMobileVisibility()

    window.addEventListener('scroll', updateMobileVisibility, {
      passive: true,
    })

    window.addEventListener('resize', updateMobileVisibility)

    return () => {
      window.removeEventListener('scroll', updateMobileVisibility)
      window.removeEventListener('resize', updateMobileVisibility)
    }
  }, [])

  /*
   * Initial animation for the icons and vertical line.
   */
  useEffect(() => {
    const rail = railRef.current

    if (!rail) {
      return undefined
    }

    registerGsapPlugins()

    const revealItems = rail.querySelectorAll(
      '.social-link-premium, [data-social-rail-line]',
    )

    if (prefersReducedMotion || document.hidden) {
      gsap.set(revealItems, {
        clearProps: 'opacity,transform,visibility',
      })

      return undefined
    }

    const showFinalState = () => {
      gsap.set(revealItems, {
        autoAlpha: 1,
        x: 0,
      })
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        showFinalState()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    if (document.hidden) {
      showFinalState()

      return () => {
        document.removeEventListener(
          'visibilitychange',
          handleVisibilityChange,
        )
      }
    }

    const context = gsap.context((self) => {
      const selector = self.selector

      if (!selector) {
        return
      }

      gsap.fromTo(
        selector('.social-link-premium, [data-social-rail-line]'),
        {
          autoAlpha: 0,
          x: -12,
        },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.55,
          ease: 'power3.out',
          stagger: 0.08,
        },
      )
    }, rail)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      context.revert()
    }
  }, [prefersReducedMotion])

  if (!hasRailLinks) {
    return null
  }

  return (
    <aside
      ref={railRef}
      aria-label="Social media links"
      className={cn(
        'fixed z-40 flex flex-col items-center',

        // Smooth mobile reveal animation
        'transition-[opacity,transform] duration-500 ease-out',

        // Mobile visibility
        isMobileRailVisible
          ? 'translate-x-0 opacity-100'
          : 'pointer-events-none -translate-x-5 opacity-0',

        // Always visible from tablet size upward
        'md:pointer-events-auto md:translate-x-0 md:opacity-100',

        positionClasses,
      )}
    >
      <SocialLinks
        links={railLinks}
        iconSize={18}
        className="flex-col gap-2 sm:gap-3 md:gap-4"
        linkClassName={cn(
          'h-9 w-9 border-transparent bg-black/45 p-0',
          'text-(--muted) backdrop-blur-md',
          'transition duration-300 ease-out',
          'hover:-translate-y-1',
          'hover:border-transparent',
          'hover:bg-black/65',
          'hover:text-(--accent)',
          'sm:h-10 sm:w-10',
          'motion-reduce:hover:translate-y-0',
        )}
      />

      <span
        aria-hidden="true"
        data-social-rail-line
        className={cn(
          'mt-3 h-12 w-px bg-(--line)',
          'sm:mt-4 sm:h-20',
          'md:mt-5 md:h-24',
        )}
      />
    </aside>
  )
}