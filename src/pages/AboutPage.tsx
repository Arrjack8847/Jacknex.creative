import { Button } from '../components/common/Button'
import { ContactCTA } from '../components/common/ContactCTA'
import { SectionHeading } from '../components/common/SectionHeading'
import { PageLayout } from '../components/layout/PageLayout'
import { siteConfig } from '../data/siteConfig'

const software = [
  'CapCut',
  'Adobe Premiere Pro',
  'After Effects',
  'Photoshop',
  'Illustrator',
  'DaVinci Resolve',
  'Figma',
]

const experienceAreas = [
  'Cinematic editing',
  'Short-form vertical edits',
  'Music teasers',
  'Event recap edits',
  'Promotional edits',
  'Poster and thumbnail support',
]

export function AboutPage() {
  const aboutWorkspace = siteConfig.media.aboutWorkspace

  return (
    <PageLayout
      description="About Soe Min Khant, also known as Jack, a Malaysia-based video editor."
      title="About"
    >
      <section className="section-shell pb-16 pt-10 sm:pb-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="mono-label text-xs font-bold text-(--accent)">
              About Jack
            </p>

            <h1 className="display-type mt-5 text-6xl text-(--text) sm:text-8xl">
              Story, rhythm, typography, color, and sound.
            </h1>
          </div>

          <p className="text-lg leading-8 text-(--muted)">
            I&apos;m Soe Min Khant, also known as Jack, a video editor based in
            Malaysia. I create cinematic edits, promotional cuts, event recaps,
            and supporting visuals for creators, events, and meaningful personal
            stories.
          </p>
        </div>

        <div
          className="media-frame media-frame--contain mt-12"
          data-media-orientation={aboutWorkspace.orientation}
          style={{
            aspectRatio: `${aboutWorkspace.width} / ${aboutWorkspace.height}`,
          }}
        >
          <img
            alt={aboutWorkspace.alt}
            className="h-full w-full object-contain"
            decoding="async"
            src={aboutWorkspace.src}
          />
        </div>

        <section className="mt-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            label="Biography"
            number="01"
            title="A Malaysia-based creator shaping modern visual stories."
          />

          <div className="space-y-6 text-lg leading-9 text-(--muted)">
            <p>
              My approach combines storytelling, rhythm, typography, colour,
              and sound to turn raw ideas into memorable visual experiences.
            </p>

            <p>
              I care about the small decisions that make a piece feel
              intentional: where a cut lands, how a title reads, how a poster
              supports the edit, and how the final delivery works on the
              platform where people actually see it.
            </p>
          </div>
        </section>

        <section className="mt-20 grid gap-10 md:grid-cols-2">
          <div className="border-t border-(--line) pt-6">
            <h2 className="mono-label text-xs font-bold text-(--accent)">
              Experience Areas
            </h2>

            <ul className="mt-6 grid gap-3">
              {experienceAreas.map((item) => (
                <li
                  className="flex items-center gap-3 text-(--text)"
                  key={item}
                >
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-(--accent)"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-(--line) pt-6">
            <h2 className="mono-label text-xs font-bold text-(--accent)">
              Selected Software
            </h2>

            <div className="mt-6 flex flex-wrap gap-3">
              {software.map((tool) => (
                <span
                  className="rounded-sm border border-(--line) px-3 py-2 text-sm text-(--muted)"
                  key={tool}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-8 border-y border-(--line) py-8 md:grid-cols-3">
          <div>
            <p className="mono-label text-xs text-(--subtle)">
              Current Availability
            </p>
            <p className="mt-3 text-(--text)">
              {siteConfig.availability}
            </p>
          </div>

          <div>
            <p className="mono-label text-xs text-(--subtle)">
              Location
            </p>
            <p className="mt-3 text-(--text)">
              {siteConfig.location}
            </p>
          </div>

          <div className="flex items-start md:justify-end">
            <Button
              download
              href="/jacknex-resume-placeholder.txt"
              variant="secondary"
            >
              Download Resume
            </Button>
          </div>
        </section>
      </section>

      <ContactCTA />
    </PageLayout>
  )
}