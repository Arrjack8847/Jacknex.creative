import { Mail } from 'lucide-react'
import type { ElementType } from 'react'
import { FacebookIcon, TelegramIcon, ViberIcon } from '../components/icons/SocialIcons'
import { siteConfig } from './siteConfig'

type SocialIcon = ElementType<{ size?: number }>

export interface SocialLink {
  id: 'telegram' | 'viber' | 'facebook' | 'email'
  label: string
  href: string
  icon: SocialIcon
  ariaLabel: string
}

interface SocialLinkConfig {
  label: string
  url: string
  icon: SocialIcon
  ariaLabel: string
}

export const socialLinkConfig = {
  telegram: {
    label: 'Telegram',
    url: 'https://t.me/JACKJACK8847',
    icon: TelegramIcon,
    ariaLabel: 'Open Telegram profile',
  },
  viber: {
    label: 'Viber',
    url: 'viber://chat?number=%2B959428502373',
    icon: ViberIcon,
    ariaLabel: 'Open Viber contact',
  },
  facebook: {
    label: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=100086610844751',
    icon: FacebookIcon,
    ariaLabel: 'Open Facebook profile',
  },
  email: {
    label: 'Email',
    url: siteConfig.contact.emailHref,
    icon: Mail,
    ariaLabel: 'Email Jack',
  },
} satisfies Record<SocialLink['id'], SocialLinkConfig>

function createSocialLink(id: SocialLink['id']): SocialLink {
  const link = socialLinkConfig[id]
  return {
    id,
    label: link.label,
    href: link.url,
    icon: link.icon,
    ariaLabel: link.ariaLabel,
  }
}

export const railSocialLinks = [
  createSocialLink('telegram'),
  createSocialLink('viber'),
  createSocialLink('facebook'),
] satisfies readonly SocialLink[]

export const footerSocialLinks = railSocialLinks

export const contactSocialLinks = [
  createSocialLink('telegram'),
  createSocialLink('viber'),
  createSocialLink('facebook'),
  createSocialLink('email'),
] satisfies readonly SocialLink[]

export const mobileSocialLinks = contactSocialLinks
export const aboutSocialLinks = contactSocialLinks
export const socialLinks = contactSocialLinks
