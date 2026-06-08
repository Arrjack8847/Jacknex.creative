import { forwardRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { mobileSocialLinks } from '../../data/socialLinks'
import { siteConfig } from '../../data/siteConfig'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../lib/cn'

export interface NavItem {
  label: string
  to: string
}

interface NavDropdownProps {
  id: string
  isOpen: boolean
  navItems: readonly NavItem[]
  onClose: () => void
}

function hasUsableHref(href: string) {
  const trimmedHref = href.trim()
  return trimmedHref.length > 0 && trimmedHref !== '#'
}

function opensInNewTab(href: string) {
  return /^https?:\/\//i.test(href)
}

export const NavDropdown = forwardRef<HTMLDivElement, NavDropdownProps>(
  function NavDropdown({ id, isOpen, navItems, onClose }, ref) {
    const prefersReducedMotion = usePrefersReducedMotion()
    const socialLinks = mobileSocialLinks.filter(
      (link) => link.id !== 'email' && hasUsableHref(link.href),
    )
    const emailLink = mobileSocialLinks.find(
      (link) => link.id === 'email' && hasUsableHref(link.href),
    )

    return (
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute right-0 top-[calc(100%+10px)] z-50 w-[min(320px,calc(100vw-40px))] origin-top-right rounded-[6px] border border-white/10 bg-black/90 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl lg:hidden"
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.98, y: -8 }
            }
            id={id}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.98, y: -8 }
            }
            ref={ref}
            transition={{ duration: prefersReducedMotion ? 0.12 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Compact navigation" className="grid">
              {navItems.map((item, index) => (
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      'group/dropdown-link grid min-h-11 grid-cols-[2rem_1fr_auto] items-center gap-3 border-b border-white/10 py-2.5 text-left transition last:border-b-0 focus-visible:outline-2 focus-visible:outline-[var(--accent-strong)] focus-visible:outline-offset-2',
                      isActive
                        ? 'text-[var(--accent)]'
                        : 'text-[var(--text)] hover:text-[var(--accent)]',
                    )
                  }
                  end={item.to === '/'}
                  key={item.to}
                  onClick={onClose}
                  to={item.to}
                >
                  {({ isActive }) => (
                    <>
                      <span className="mono-label text-[11px] text-[var(--subtle)]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[1.15rem] font-semibold leading-none">
                        {item.label}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className={cn(
                          'opacity-0 transition duration-200 group-hover/dropdown-link:-translate-y-0.5 group-hover/dropdown-link:translate-x-0.5 group-hover/dropdown-link:opacity-100 motion-reduce:transform-none',
                          isActive && 'opacity-100',
                        )}
                        size={16}
                        strokeWidth={1.8}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="mt-4 border-t border-white/10 pt-4">
              {socialLinks.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((link) => {
                    const Icon = link.icon
                    const shouldOpenInNewTab = opensInNewTab(link.href)

                    return (
                      <a
                        aria-label={link.ariaLabel}
                        className="mono-label inline-flex min-h-9 items-center gap-2 rounded-[4px] border border-white/10 px-2.5 text-[10px] text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent-strong)] focus-visible:outline-offset-2"
                        href={link.href}
                        key={link.id}
                        onClick={onClose}
                        rel={shouldOpenInNewTab ? 'noopener noreferrer' : undefined}
                        target={shouldOpenInNewTab ? '_blank' : undefined}
                      >
                        <Icon size={14} />
                        {link.label}
                      </a>
                    )
                  })}
                </div>
              ) : null}

              {emailLink ? (
                <a
                  className="mt-3 block break-all text-sm leading-6 text-[var(--text)] transition hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent-strong)] focus-visible:outline-offset-2"
                  href={emailLink.href}
                  onClick={onClose}
                >
                  {siteConfig.contact.email}
                </a>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    )
  },
)
