import { SocialLinks } from '../common/SocialLinks'
import { socialLinks } from '../../data/socialLinks'
import { cn } from '../../lib/cn'

type SocialLink = (typeof socialLinks)[number]

const positionClasses =
  'left-2 bottom-40 sm:left-3 sm:bottom-40 md:left-4 md:bottom-8 lg:left-5 lg:bottom-10 xl:left-7 xl:bottom-10 2xl:left-9 2xl:bottom-12'

const railLinks: SocialLink[] = socialLinks.filter(
  (link: SocialLink) => {
    const href = link.href.trim()
    return href.length > 0 && href !== '#'
  },
)

export function SocialRail() {
  const hasRailLinks = railLinks.some(
    (link: SocialLink) => {
      const href = link.href.trim()
      return href.length > 0 && href !== '#'
    },
  )

  if (!hasRailLinks) {
    return null
  }

  return (
    <aside
      aria-label="Social media links"
      className={cn(
        'fixed z-40 flex flex-col items-center',
        positionClasses,
      )}
    >
      <SocialLinks
        className="flex-col gap-2 sm:gap-3 md:gap-4"
        iconSize={18}
        linkClassName={cn(
          'h-9 w-9 border-transparent bg-black/45 p-0',
          'text-(--muted) backdrop-blur-md transition',
          'hover:-translate-y-1',
          'hover:border-transparent',
          'hover:bg-black/65',
          'hover:text-(--accent)',
          'sm:h-10 sm:w-10',
          'motion-reduce:hover:translate-y-0',
        )}
        links={railLinks}
      />

      <span
        aria-hidden="true"
        className={cn(
          'mt-4 h-16 w-px bg-(--line)',
          'sm:h-20',
          'md:mt-5 md:h-24',
        )}
      />
    </aside>
  )
}