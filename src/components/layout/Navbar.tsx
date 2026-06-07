import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { siteConfig } from '../../data/siteConfig'
import { cn } from '../../lib/cn'
import { Button } from '../common/Button'
import { MobileMenu } from './MobileMenu'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition duration-300',
          isScrolled
            ? 'border-b border-[var(--line)] bg-[rgba(8,8,7,0.86)] backdrop-blur-xl'
            : 'bg-transparent',
        )}
      >
        <div className="wide-shell flex h-20 items-center justify-between">
          <Link
            className="mono-label text-lg font-black text-[var(--text)]"
            to="/"
          >
            {siteConfig.logo}
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-8 lg:flex"
          >
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    'mono-label text-xs font-bold text-[var(--muted)] transition hover:text-[var(--text)]',
                    isActive && 'text-[var(--accent)]',
                  )
                }
                end={item.to === '/'}
                key={item.to}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button to="/contact">Start a Project</Button>
          </div>

          <button
            aria-expanded={isMenuOpen}
            aria-label="Open menu"
            className="grid h-12 w-12 place-items-center rounded-[4px] border border-[var(--line)] text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] lg:hidden"
            onClick={() => setIsMenuOpen(true)}
            type="button"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  )
}