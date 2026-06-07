import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { siteConfig } from '../../data/siteConfig'
import { Button } from '../common/Button'
import { SocialLinks } from '../common/SocialLinks'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-[var(--bg)] lg:hidden"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <div className="flex h-full flex-col justify-between p-5">
            <div className="flex items-center justify-between">
              <Link className="mono-label text-lg font-black text-[var(--text)]" onClick={onClose} to="/">
                {siteConfig.logo}
              </Link>
              <button
                aria-label="Close menu"
                className="grid h-12 w-12 place-items-center rounded-[4px] border border-[var(--line)] text-[var(--text)]"
                onClick={onClose}
                type="button"
              >
                <X size={22} />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="grid gap-4">
              {navItems.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    `display-type text-6xl transition sm:text-7xl ${
                      isActive ? 'text-[var(--accent)]' : 'text-[var(--text)]'
                    }`
                  }
                  key={item.to}
                  onClick={onClose}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
              <Button className="mt-4 w-full" onPress={onClose} to="/contact">
                Start a Project
              </Button>
            </nav>

            <SocialLinks className="border-t border-[var(--line)] pt-6" />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
