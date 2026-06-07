import { siteMedia } from './projects'

export const siteConfig = {
  brandName: 'JACKNEX CREATIVE',
  logo: 'JACKNEX',
  creator: 'Soe Min Khant',
  knownAs: 'Jack',
  roles: ['Video Editor', 'Graphic Designer', 'Motion Designer'],
  location: 'Malaysia',
  tagline: 'I EDIT STORIES.\nI DESIGN IMPACT.',
  description:
    'Cinematic video editing, motion, and graphic design for brands, creators, events, and meaningful stories.',
  seoTitle: 'JackNex Creative - Video Editor & Graphic Designer',
  seoDescription:
    'Portfolio of Jack, a Malaysia-based video editor and graphic designer creating cinematic edits, motion content, and modern visual designs.',
  contact: {
    email: 'hello@jacknexcreative.com',
    emailHref: 'mailto:hello@jacknexcreative.com',
    viberPhone: '+959428502373',
    viber: 'viber://chat?number=%2B959428502373',
    telegramHandle: '@JACKJACK8847',
    telegram: 'https://t.me/JACKJACK8847',
    facebook: 'https://www.facebook.com/profile.php?id=100086610844751',
    facebookPage: 'https://www.facebook.com/share/1BVC6Krv6k/?mibextid=wwXIfr',
    instagram: 'https://instagram.com/jacknexcreative',
    instagramHandle: '@jacknexcreative',
    linkedin: 'https://www.linkedin.com/in/soe-min-khant-1a138534b',
    youtube: '',
  },
  availability: 'Available for selected editing, motion, and design projects.',
  media: {
    heroPoster: siteMedia.heroPoster,
    showreel: siteMedia.showreel,
    aboutWorkspace: siteMedia.aboutWorkspace,
    heroVideo: undefined,
  },
} as const
