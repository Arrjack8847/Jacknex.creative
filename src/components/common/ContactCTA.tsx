import { Mail, Phone, Send } from 'lucide-react'
import { siteConfig } from '../../data/siteConfig'
import { Button } from './Button'

export function ContactCTA() {
  return (
    <section className="section-shell py-16 sm:py-24">
      <div className="grid gap-8 border-y border-[var(--line)] py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="mono-label text-xs font-bold text-[var(--accent)]">Project enquiry</p>
          <h2 className="display-type mt-5 text-5xl text-[var(--text)] sm:text-7xl">
            HAVE A STORY TO TELL?
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--muted)]">
            Let's turn it into something unforgettable.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Button to="/contact">Start a Project</Button>
          <Button href={siteConfig.contact.emailHref} icon={<Mail size={17} />} variant="secondary">
            Email Me
          </Button>
          <Button href={siteConfig.contact.viber} icon={<Phone size={17} />} variant="secondary">
            Viber
          </Button>
          <Button href={siteConfig.contact.telegram} icon={<Send size={17} />} variant="secondary">
            Telegram
          </Button>
        </div>
      </div>
    </section>
  )
}
