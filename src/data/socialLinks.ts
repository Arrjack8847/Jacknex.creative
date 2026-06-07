import { AtSign, BriefcaseBusiness, Camera, Mail, MessageCircle, Phone, Play, Send, Share2 } from 'lucide-react'
import { siteConfig } from './siteConfig'

type SocialIcon = typeof AtSign

export interface SocialLink {
  label: string
  href: string
  icon: SocialIcon
  ariaLabel?: string
}

export const socialLinks = [
  {
    label: 'Email',
    href: siteConfig.contact.emailHref,
    icon: AtSign,
  },
  {
    label: 'Viber',
    href: siteConfig.contact.viber,
    icon: Phone,
  },
  {
    label: 'Telegram',
    href: siteConfig.contact.telegram,
    icon: Send,
  },
  {
    label: 'Facebook',
    href: siteConfig.contact.facebook,
    icon: MessageCircle,
  },
  {
    label: 'Facebook Page',
    href: siteConfig.contact.facebookPage,
    icon: Share2,
  },
  {
    label: 'Instagram',
    href: siteConfig.contact.instagram,
    icon: Camera,
  },
  {
    label: 'LinkedIn',
    href: siteConfig.contact.linkedin,
    icon: BriefcaseBusiness,
  },
] satisfies readonly SocialLink[]

export const aboutSocialLinks = [
  {
    label: 'Instagram',
    href: siteConfig.contact.instagram,
    icon: Camera,
    ariaLabel: 'Open Instagram profile',
  },
  {
    label: 'YouTube',
    href: siteConfig.contact.youtube,
    icon: Play,
    ariaLabel: 'Open YouTube channel',
  },
  {
    label: 'LinkedIn',
    href: siteConfig.contact.linkedin,
    icon: BriefcaseBusiness,
    ariaLabel: 'Open LinkedIn profile',
  },
  {
    label: 'Email',
    href: siteConfig.contact.emailHref,
    icon: Mail,
    ariaLabel: 'Email Jack',
  },
] satisfies readonly SocialLink[]
