import { ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SocialLinks } from '../common/SocialLinks'
import { footerSocialLinks } from '../../data/socialLinks'
import { siteConfig } from '../../data/siteConfig'

const footerLinks = [
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--line)] bg-black/20">
      <div className="section-shell grid gap-10 py-12 lg:grid-cols-[1fr_1fr_1fr_auto]">
        <div>
          <Link className="mono-label text-lg font-black text-[var(--text)]" to="/">
            {siteConfig.brandName}
          </Link>
          <p className="mt-3 text-sm text-[var(--muted)]">Video Editor / Visual Support</p>
          <p className="mt-8 mono-label text-xs text-[var(--subtle)]">
            (C) {currentYear} {siteConfig.brandName}. All rights reserved.
          </p>
        </div>
        <nav aria-label="Footer navigation" className="grid gap-3 sm:grid-cols-2">
          {footerLinks.map((link) => (
            <Link className="text-[var(--muted)] transition hover:text-[var(--accent)]" key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div>
          <p className="mono-label text-xs text-[var(--subtle)]">Email</p>
          <a className="mt-3 inline-block text-[var(--muted)] transition hover:text-[var(--accent)]" href={siteConfig.contact.emailHref}>
            {siteConfig.contact.email}
          </a>
        </div>
        <div className="flex flex-wrap items-start gap-3 lg:justify-end">
          <SocialLinks className="contents" links={footerSocialLinks} />
          <button
            aria-label="Back to top"
            className="grid h-11 w-11 place-items-center rounded-[4px] border border-[var(--line)] text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            type="button"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  )
}
