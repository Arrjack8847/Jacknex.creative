import { Mail, MessageCircle, Send } from 'lucide-react'
import { PageLayout } from '../components/layout/PageLayout'
import { siteConfig } from '../data/siteConfig'

const contactLinks = {
  viber: 'viber://chat?number=%2B959428502373',
  telegram: 'https://t.me/JACKJACK8847',
}

export function ContactPage() {
  return (
    <PageLayout
      title="Contact Jack"
      description="Message Jack for video editing, design, and creative projects."
    >
      <section className="section-shell flex min-h-[80svh] items-center py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mono-label text-[10px] uppercase tracking-[0.22em] text-(--accent)">
            Contact
          </p>

          <h1 className="display-type mt-5 text-[clamp(3rem,10vw,7rem)] leading-none text-(--text)">
            Message Jack
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-(--muted) sm:text-lg">
            Have a project in mind? Send me a message directly and let’s talk
            about your video, design, or creative idea.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <a
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-sm border border-(--line-strong) px-6 font-bold text-(--text) transition hover:border-(--accent) hover:text-(--accent)"
              href={contactLinks.viber}
            >
              <MessageCircle size={18} />
              Viber
            </a>

            <a
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-sm border border-(--line-strong) px-6 font-bold text-(--text) transition hover:border-(--accent) hover:text-(--accent)"
              href={contactLinks.telegram}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Send size={18} />
              Telegram
            </a>

            <a
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-sm border border-(--line-strong) px-6 font-bold text-(--text) transition hover:border-(--accent) hover:text-(--accent) sm:col-span-2"
              href={siteConfig.contact.emailHref}
            >
              <Mail size={18} />
              Email
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}