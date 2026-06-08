import { Button } from '../components/common/Button'
import { ContactCTA } from '../components/common/ContactCTA'
import { SectionHeading } from '../components/common/SectionHeading'
import { PageLayout } from '../components/layout/PageLayout'
import { serviceGroups, workingProcess } from '../data/services'

export function ServicesPage() {
  return (
    <PageLayout
      description="Video editing and supporting visual services by JackNex Creative."
      title="Services"
    >
      <section className="section-shell pb-16 pt-10 sm:pb-24">
        <div className="max-w-5xl">
          <p className="mono-label text-xs font-bold text-[var(--accent)]">Services</p>
          <h1 className="display-type mt-5 text-6xl text-[var(--text)] sm:text-8xl">
            Focused editing for finished videos and release visuals.
          </h1>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {serviceGroups.map((group) => (
            <article className="border-t border-[var(--line)] pt-8" key={group.title}>
              <h2 className="display-type text-6xl text-[var(--text)]">{group.title}</h2>
              <p className="mt-5 max-w-xl leading-8 text-[var(--muted)]">{group.summary}</p>
              <ul className="mt-8 grid gap-3">
                {group.services.map((service) => (
                  <li className="flex items-center gap-3 text-[var(--text)]" key={service}>
                    <span className="h-px w-8 bg-[var(--accent)]" />
                    {service}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button to="/contact" variant="secondary">
                  Discuss Your Project
                </Button>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-20">
          <SectionHeading
            label="Working Process"
            number="01"
            title="A clear path from idea to delivery."
            copy="No fake fixed prices here. Every quote depends on scope, format, deadline, and deliverables."
          />
          <ol className="mt-10 grid gap-5 md:grid-cols-5">
            {workingProcess.map((step, index) => (
              <li className="border-t border-[var(--line)] pt-5" key={step}>
                <span className="mono-label text-xs text-[var(--accent)]">0{index + 1}</span>
                <p className="mt-4 font-semibold text-[var(--text)]">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </section>
      <ContactCTA />
    </PageLayout>
  )
}
