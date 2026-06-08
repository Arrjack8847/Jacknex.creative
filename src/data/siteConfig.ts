import { siteMedia } from './projects'

export const siteConfig = {
  brandName: 'JACKNEX CREATIVE',
  logo: 'JACKNEX',
  creator: 'Soe Min Khant',
  knownAs: 'Jack',
  roles: ['Video Editor', 'Visual Support Designer'],
  location: 'Malaysia',
  tagline: 'I EDIT STORIES.\nI DESIGN IMPACT.',
  description:
    'Cinematic video editing and supporting visuals for music teasers, events, creators, and meaningful stories.',
  seoTitle: 'JackNex Creative - Video Editor',
  seoDescription:
    'Portfolio of Jack, a Malaysia-based video editor creating cinematic edits, music teasers, event recaps, and supporting visual assets.',
  contact: {
    email: 'smks8847@gmail.com',
    emailHref: 'mailto:smks8847@gmail.com',
  },
  availability: 'Available for selected video editing and supporting visual projects.',
  media: {
    heroPoster: siteMedia.heroPoster,
    showreel: siteMedia.showreel,
    aboutWorkspace: siteMedia.aboutWorkspace,
    heroVideo: undefined,
  },
} as const
