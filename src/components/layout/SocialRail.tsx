import { SocialLinks } from '../common/SocialLinks'
import { aboutSocialLinks } from '../../data/socialLinks'

export function SocialRail() {
  return (
    <aside
      aria-label="Social media links"
      className="fixed left-6 top-[56%] z-30 hidden -translate-y-1/2 flex-col items-center gap-3 2xl:flex"
    >
      <SocialLinks
        className="flex-col gap-3"
        iconSize={17}
        linkClassName="h-10 w-10 bg-black/15 backdrop-blur-sm hover:translate-x-0.5"
        links={aboutSocialLinks}
      />
      <span aria-hidden="true" className="h-16 w-px bg-[var(--line)]" />
    </aside>
  )
}
