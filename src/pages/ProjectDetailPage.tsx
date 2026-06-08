import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '../components/common/Button'
import { ContactCTA } from '../components/common/ContactCTA'
import { MediaPlaceholder } from '../components/common/MediaPlaceholder'
import { SectionHeading } from '../components/common/SectionHeading'
import { VideoPlayer } from '../components/common/VideoPlayer'
import { PageLayout } from '../components/layout/PageLayout'
import { ProjectMediaGallery } from '../components/project/ProjectMediaGallery'
import {
  categoryLabels,
  getNextProject,
  getProjectBySlug,
} from '../data/projects'
import type { ProjectMedia } from '../types/project'
import { NotFoundPage } from './NotFoundPage'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = slug ? getProjectBySlug(slug) : undefined

  if (!project) {
    return <NotFoundPage />
  }

  const nextProject = getNextProject(project.slug)
  const isVideoProject = Boolean(project.fullVideo)
  const heroMedia = project.fullVideo ?? project.cover

  const supportingMedia = (
    isVideoProject
      ? project.gallery
      : [project.cover, ...project.gallery]
  )
    .filter((item): item is ProjectMedia => Boolean(item))
    .filter(
      (item, index, items) =>
        items.findIndex((candidate) => candidate.id === item.id) === index,
    )

  return (
    <PageLayout
      description={project.summary}
      title={project.title}
    >
      <article className="section-shell pb-16 pt-10 sm:pb-24">
        <Link
          className="mono-label inline-flex items-center gap-2 text-xs text-(--muted) transition-colors hover:text-(--accent)"
          to="/work"
        >
          <ArrowLeft size={16} />
          Back to work
        </Link>

        <header className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="mono-label text-xs font-bold text-(--accent)">
              {project.projectType} / {project.year}
            </p>

            <h1 className="display-type mt-5 text-6xl text-(--text) sm:text-8xl">
              {project.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-(--muted)">
              {project.subtitle}
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-5 border-y border-(--line) py-6 text-sm">
            <div>
              <dt className="mono-label text-xs text-(--subtle)">
                Client
              </dt>

              <dd className="mt-2 text-(--text)">
                {project.client}
              </dd>
            </div>

            <div>
              <dt className="mono-label text-xs text-(--subtle)">
                Role
              </dt>

              <dd className="mt-2 text-(--text)">
                {project.roles.join(', ')}
              </dd>
            </div>

            <div>
              <dt className="mono-label text-xs text-(--subtle)">
                Type
              </dt>

              <dd className="mt-2 text-(--text)">
                {project.categories
                  .map((category) => categoryLabels[category])
                  .join(', ')}
              </dd>
            </div>

            <div>
              <dt className="mono-label text-xs text-(--subtle)">
                Year
              </dt>

              <dd className="mt-2 text-(--text)">
                {project.year}
              </dd>
            </div>
          </dl>
        </header>

        <section className="mt-12">
          {heroMedia.type === 'video' ? (
            <VideoPlayer
              className={
                heroMedia.orientation === 'portrait'
                  ? 'mx-auto max-h-[82vh] max-w-135'
                  : undefined
              }
              duration={heroMedia.duration}
              height={heroMedia.height}
              label="Project Film"
              orientation={heroMedia.orientation}
              poster={heroMedia.poster ?? project.cover.src}
              title={heroMedia.title ?? project.title}
              videoSrc={heroMedia.src}
              width={heroMedia.width}
            />
          ) : heroMedia ? (
            <div
              className="media-frame media-frame--contain"
              data-media-orientation={heroMedia.orientation}
              style={{
                aspectRatio: `${heroMedia.width} / ${heroMedia.height}`,
              }}
            >
              <img
                alt={heroMedia.alt}
                className="h-full w-full object-contain"
                decoding="async"
                src={heroMedia.src}
              />
            </div>
          ) : (
            <MediaPlaceholder
              aspect="video"
              title={project.title}
            />
          )}
        </section>

        <section className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            label="Overview"
            number="01"
            title="The brief, the feeling, and the visual direction."
          />

          <p className="text-xl leading-9 text-(--muted)">
            {project.summary}
          </p>
        </section>

        <section className="mt-16 grid gap-8 md:grid-cols-2">
          {[
            {
              label: 'Challenge',
              copy: project.challenge,
            },
            {
              label: 'Creative Approach',
              copy: project.approach,
            },
            {
              label: 'Outcome',
              copy: project.outcome,
            },
          ].map((item) => (
            <div
              className="border-t border-(--line) pt-6"
              key={item.label}
            >
              <h2 className="mono-label text-xs font-bold text-(--accent)">
                {item.label}
              </h2>

              <p className="mt-4 leading-8 text-(--muted)">
                {item.copy}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-20">
          <SectionHeading
            copy="The work is shaped through direction, assembly, and refinement so each finished edit has a clear mood, pace, and purpose."
            label="Process"
            number="02"
            title={
              isVideoProject
                ? 'From footage to final cut.'
                : 'Supporting visuals for the edit.'
            }
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {['Direction', 'Assembly', 'Refinement'].map(
              (step, index) => (
                <div
                  className="border-t border-(--line) pt-5"
                  key={step}
                >
                  <p className="mono-label text-xs text-(--accent)">
                    0{index + 1}
                  </p>

                  <h3 className="mt-4 text-2xl font-semibold text-(--text)">
                    {step}
                  </h3>

                  <p className="mt-3 leading-7 text-(--muted)">
                    {index === 0
                      ? 'Clarify emotion, audience, references, format, and delivery goals.'
                      : index === 1
                        ? 'Build the core edit or layout system before polishing small details.'
                        : 'Tune pace, color, typography, export ratios, and handoff details.'}
                  </p>
                </div>
              ),
            )}
          </div>
        </section>

        {supportingMedia.length > 0 ? (
          <section className="mt-20">
            <SectionHeading
              label="Supporting Visuals"
              number="03"
              title={
                isVideoProject
                  ? 'Posters, covers, and related images for this video.'
                  : 'Visual support frames.'
              }
            />

            <ProjectMediaGallery media={supportingMedia} />
          </section>
        ) : null}

        <section className="mt-20 grid gap-8 md:grid-cols-2">
          <div className="border-t border-(--line) pt-6">
            <h2 className="mono-label text-xs font-bold text-(--accent)">
              Tools
            </h2>

            <div className="mt-5 flex flex-wrap gap-3">
              {project.tools.map((tool) => (
                <span
                  className="rounded-sm border border-(--line) px-3 py-2 text-sm text-(--muted)"
                  key={tool}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-(--line) pt-6">
            <h2 className="mono-label text-xs font-bold text-(--accent)">
              Responsibilities
            </h2>

            <div className="mt-5 flex flex-wrap gap-3">
              {project.roles.map((role) => (
                <span
                  className="rounded-sm border border-(--line) px-3 py-2 text-sm text-(--muted)"
                  key={role}
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </section>

        {nextProject ? (
          <section className="mt-20 flex flex-col gap-5 border-y border-(--line) py-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mono-label text-xs text-(--accent)">
                Next video
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-(--text)">
                {nextProject.title}
              </h2>
            </div>

            <Button
              icon={<ArrowRight size={17} />}
              to={`/work/${nextProject.slug}`}
              variant="secondary"
            >
              View Next
            </Button>
          </section>
        ) : null}
      </article>

      <ContactCTA />
    </PageLayout>
  )
}