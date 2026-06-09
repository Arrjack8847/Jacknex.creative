import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { siteConfig } from '../../data/siteConfig'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../lib/cn'
import { gsap, registerGsapPlugins } from '../../lib/gsap'
import { NavDropdown, type NavItem } from './NavDropdown'

const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const desktopNavItems = navItems
const compactNavigationId = 'mobile-navigation'

export function Navbar() {
  const location = useLocation()
  const prefersReducedMotion = usePrefersReducedMotion()

  const [isScrolled, setIsScrolled] = useState(
    () => window.scrollY > 24,
  )
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header = headerRef.current

    if (!header) {
      return undefined
    }

    registerGsapPlugins()

    const revealItems = header.querySelectorAll('[data-nav-reveal]')

    if (prefersReducedMotion || document.hidden) {
      gsap.set(revealItems, {
        clearProps: 'opacity,transform,visibility',
      })

      return undefined
    }

    const showFinalState = () => {
      gsap.set(revealItems, {
        autoAlpha: 1,
        y: 0,
      })
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        showFinalState()
      }
    }

    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange,
    )

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
        selector('[data-nav-reveal]'),
        {
          autoAlpha: 0,
          y: -10,
        },
        {
          autoAlpha: 1,
          duration: 0.56,
          ease: 'power3.out',
          stagger: 0.07,
          y: 0,
        },
      )
    }, header)

    return () => {
      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange,
      )

      context.revert()
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    let currentScrolled = window.scrollY > 24

    const handleScroll = () => {
      const nextScrolled = window.scrollY > 24

      if (nextScrolled !== currentScrolled) {
        currentScrolled = nextScrolled
        setIsScrolled(nextScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsMenuOpen(false)
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [location.pathname])

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target

      if (!(target instanceof Node)) {
        return
      }

      if (
        dropdownRef.current?.contains(target) ||
        menuButtonRef.current?.contains(target)
      ) {
        return
      }

      setIsMenuOpen(false)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return
      }

      event.preventDefault()
      setIsMenuOpen(false)

      window.requestAnimationFrame(() => {
        menuButtonRef.current?.focus()
      })
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener(
        'pointerdown',
        handlePointerDown,
      )

      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
        isScrolled
          ? 'border-b border-white/[0.08] bg-[rgba(8,8,7,0.84)] backdrop-blur-xl'
          : 'border-b border-white/[0.06] bg-black/70 backdrop-blur-lg lg:border-transparent lg:bg-transparent lg:backdrop-blur-0',
      )}
      ref={headerRef}
    >
      <div className="wide-shell relative flex h-[74px] items-center justify-between lg:h-[76px] xl:h-20">
        <Link
          aria-label="Go to homepage"
          className="mono-label text-[23px] font-black text-[var(--text)] transition-colors duration-300 hover:text-[var(--accent)] sm:text-2xl lg:text-xl xl:text-[22px]"
          data-nav-reveal
          to="/"
        >
          {siteConfig.logo}
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 lg:flex xl:gap-9"
          data-nav-reveal
        >
          {desktopNavItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                cn(
                  'mono-label group relative py-2 text-[11px] font-bold transition-colors duration-300 hover:text-[var(--text)]',
                  isActive
                    ? 'text-[var(--text)]'
                    : 'text-[var(--muted)]',
                )
              }
              end={item.to === '/'}
              key={item.to}
              to={item.to}
            >
              {({ isActive }) => (
                <>
                  {item.label}

                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute -bottom-1 left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-70',
                      isActive && 'opacity-100',
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          aria-controls={compactNavigationId}
          aria-expanded={isMenuOpen}
          aria-label={
            isMenuOpen
              ? 'Close navigation menu'
              : 'Open navigation menu'
          }
          className={cn(
            'grid h-11 w-11 place-items-center rounded-[4px] border border-white/10 text-[var(--text)] transition duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent-strong)] focus-visible:outline-offset-2 sm:h-12 sm:w-12 lg:hidden',
            isMenuOpen &&
              'border-[var(--accent)] text-[var(--accent)]',
          )}
          data-nav-reveal
          onClick={() => {
            setIsMenuOpen((current) => !current)
          }}
          ref={menuButtonRef}
          type="button"
        >
          {isMenuOpen ? (
            <X size={21} strokeWidth={1.8} />
          ) : (
            <Menu size={21} strokeWidth={1.8} />
          )}
        </button>

        <NavDropdown
          id={compactNavigationId}
          isOpen={isMenuOpen}
          navItems={navItems}
          onClose={() => setIsMenuOpen(false)}
          ref={dropdownRef}
        />
      </div>
    </header>
  )
}