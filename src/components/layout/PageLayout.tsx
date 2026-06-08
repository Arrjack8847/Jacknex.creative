import { useEffect, type ReactNode } from 'react'
import { siteConfig } from '../../data/siteConfig'
import { cn } from '../../lib/cn'

interface PageLayoutProps {
  title: string
  description: string
  children: ReactNode
  className?: string
}

function setMeta(selector: string, attribute: 'content', value: string) {
  const element = document.querySelector(selector)
  if (element) {
    element.setAttribute(attribute, value)
  }
}

export function PageLayout({ title, description, children, className }: PageLayoutProps) {
  useEffect(() => {
    const pageTitle = title.includes('JackNex') ? title : `${title} | ${siteConfig.brandName}`
    document.title = pageTitle
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', pageTitle)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[name="twitter:title"]', 'content', pageTitle)
    setMeta('meta[name="twitter:description"]', 'content', description)
  }, [description, title])

  return <main className={cn('min-h-screen pt-[82px] lg:pt-[84px] xl:pt-[88px]', className)}>{children}</main>
}
