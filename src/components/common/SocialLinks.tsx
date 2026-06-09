import { socialLinks, type SocialLink } from '../../data/socialLinks'
import { cn } from '../../lib/cn'

interface SocialLinksProps {
  links?: readonly SocialLink[]
  className?: string
  linkClassName?: string
  iconSize?: number
  onLinkClick?: () => void
}

function hasUsableHref(href: string) {
  const trimmedHref = href.trim()
  return trimmedHref.length > 0 && trimmedHref !== '#'
}

function shouldOpenInNewTab(link: SocialLink) {
  return link.id !== 'email' && hasUsableHref(link.href)
}

export function SocialLinks({
  links = socialLinks,
  className,
  linkClassName,
  iconSize = 18,
  onLinkClick,
}: SocialLinksProps) {
  const usableLinks = links.filter((link) => hasUsableHref(link.href))

  if (usableLinks.length === 0) {
    return null
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {usableLinks.map((link) => {
        const Icon = link.icon
        const opensInNewTab = shouldOpenInNewTab(link)

        return (
          <a
            aria-label={link.ariaLabel ?? link.label}
            className={cn(
              'social-link-premium grid h-11 w-11 place-items-center rounded-[4px] border border-[var(--line)] text-[var(--muted)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]',
              linkClassName,
            )}
            href={link.href}
            key={`${link.label}-${link.href}`}
            onClick={onLinkClick}
            rel={opensInNewTab ? 'noopener noreferrer' : undefined}
            target={opensInNewTab ? '_blank' : undefined}
          >
            <Icon size={iconSize} />
          </a>
        )
      })}
    </div>
  )
}
