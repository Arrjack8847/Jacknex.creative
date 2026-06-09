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

  const project = slug
    ? getProjectBySlug(slug)
    : undefined

  if (!project) {
    return <NotFoundPage />
  }

  const nextProject = getNextProject(project.slug)
  const isVideoProject = Boolean(project.fullVideo)
  const heroMedia = project.fullVideo ?? project.cover

  const isPortraitHero =
    heroMedia?.orientation === 'portrait'

  const heroPoster =
    heroMedia?.type === 'video'
      ? heroMedia.poster ?? project.cover.src
      : heroMedia?.src ?? project.cover.src

  const supportingMedia = (
    isVideoProject
      ? project.gallery
      : [project.cover, ...project.gallery]
  )
    .filter(
      (item): item is ProjectMedia => Boolean(item),
    )
    .filter(
      (item, index, items) =>
        items.findIndex(
          (candidate) =>
            candidate.id === item.id,
        ) === index,
    )

  return (
    <PageLayout
      description={project.summary}
      title={project.title}
    >
      <article className="overflow-hidden pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pb-24 lg:pt-10">
        {/* Back button */}
        <div className="section-shell">
          <Link
            className="mono-label inline-flex items-center gap-2 text-xs text-(--muted) transition-colors duration-300 hover:text-(--accent)"
            to="/work"
          >
            <ArrowLeft size={16} />
            Back to work
          </Link>
        </div>

        {/* Main project video or image */}
        <section
          aria-label={`${project.title} featured media`}
          className="mt-5 sm:mt-7 lg:mt-9"
        >
          <div className="project-main-media-shell">
            {!heroMedia ? (
              <div className="project-landscape-stage">
                <MediaPlaceholder
                  aspect="video"
                  title={project.title}
                />
              </div>
            ) : heroMedia.type === 'video' ? (
              isPortraitHero ? (
                /* Portrait video */
                <div className="project-portrait-stage">
                  <img
                    alt=""
                    aria-hidden="true"
                    className="project-portrait-stage__background"
                    decoding="async"
                    src={heroPoster}
                  />

                  <div
                    aria-hidden="true"
                    className="project-portrait-stage__veil"
                  />

                  <div className="project-portrait-stage__content">
                    <VideoPlayer
                      className="project-main-video project-main-video--portrait"
                      duration={heroMedia.duration}
                      height={heroMedia.height}
                      orientation={heroMedia.orientation}
                      poster={heroPoster}
                      title={
                        heroMedia.title ??
                        project.title
                      }
                      videoSrc={heroMedia.src}
                      width={heroMedia.width}
                    />
                  </div>
                </div>
              ) : (
                /* Landscape video */
                <div className="project-landscape-stage">
                  <VideoPlayer
                    className="project-main-video project-main-video--landscape"
                    duration={heroMedia.duration}
                    height={heroMedia.height}
                    orientation={heroMedia.orientation}
                    poster={heroPoster}
                    title={
                      heroMedia.title ??
                      project.title
                    }
                    videoSrc={heroMedia.src}
                    width={heroMedia.width}
                  />
                </div>
              )
            ) : (
              /* Main image */
              <div
                className={`project-main-image-stage ${
                  isPortraitHero
                    ? 'project-main-image-stage--portrait'
                    : 'project-main-image-stage--landscape'
                }`}
              >
                {isPortraitHero ? (
                  <>
                    <img
                      alt=""
                      aria-hidden="true"
                      className="project-main-image-background"
                      decoding="async"
                      src={heroMedia.src}
                    />

                    <div
                      aria-hidden="true"
                      className="project-portrait-stage__veil"
                    />
                  </>
                ) : null}

                <img
                  alt={heroMedia.alt}
                  className="project-main-image"
                  decoding="async"
                  height={heroMedia.height}
                  src={heroMedia.src}
                  width={heroMedia.width}
                />
              </div>
            )}
          </div>
        </section>

        {/* Main written content */}
        <div className="section-shell">
          {/* Project heading */}
          <header className="mt-10 grid gap-8 sm:mt-12 lg:mt-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-14">
            <div>
              <p className="mono-label text-xs font-bold text-(--accent)">
                {project.projectType} / {project.year}
              </p>

              <h1 className="display-type mt-5 max-w-5xl text-[clamp(3.25rem,10vw,8.5rem)] leading-[0.84] tracking-[-0.045em] text-(--text)">
                {project.title}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-(--muted) sm:text-lg sm:leading-8 lg:text-xl">
                {project.subtitle}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-x-5 gap-y-7 border-y border-(--line) py-6 text-sm sm:gap-x-8 sm:py-7">
              <div className="min-w-0">
                <dt className="mono-label text-xs text-(--subtle)">
                  Client
                </dt>

                <dd className="mt-2 break-words leading-6 text-(--text)">
                  {project.client}
                </dd>
              </div>

              <div className="min-w-0">
                <dt className="mono-label text-xs text-(--subtle)">
                  Role
                </dt>

                <dd className="mt-2 break-words leading-6 text-(--text)">
                  {project.roles.join(', ')}
                </dd>
              </div>

              <div className="min-w-0">
                <dt className="mono-label text-xs text-(--subtle)">
                  Type
                </dt>

                <dd className="mt-2 break-words leading-6 text-(--text)">
                  {project.categories
                    .map(
                      (category) =>
                        categoryLabels[category],
                    )
                    .join(', ')}
                </dd>
              </div>

              <div className="min-w-0">
                <dt className="mono-label text-xs text-(--subtle)">
                  Year
                </dt>

                <dd className="mt-2 break-words leading-6 text-(--text)">
                  {project.year}
                </dd>
              </div>
            </dl>
          </header>

          {/* Overview */}
          <section className="mt-14 grid gap-8 sm:mt-16 lg:mt-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
            <SectionHeading
              label="Overview"
              number="01"
              title="The brief, the feeling, and the visual direction."
            />

            <p className="max-w-3xl text-lg leading-8 text-(--muted) sm:text-xl sm:leading-9">
              {project.summary}
            </p>
          </section>

          {/* Challenge, approach and outcome */}
          <section className="mt-14 grid gap-8 sm:mt-16 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
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

          {/* Process */}
          <section className="mt-16 sm:mt-20 lg:mt-24">
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

            <div className="mt-9 grid gap-8 sm:mt-10 md:grid-cols-3 md:gap-5 lg:gap-8">
              {[
                {
                  title: 'Direction',
                  copy: 'Clarify emotion, audience, references, format, and delivery goals.',
                },
                {
                  title: 'Assembly',
                  copy: 'Build the core edit or layout system before polishing small details.',
                },
                {
                  title: 'Refinement',
                  copy: 'Tune pace, color, typography, export ratios, and handoff details.',
                },
              ].map((step, index) => (
                <div
                  className="border-t border-(--line) pt-5"
                  key={step.title}
                >
                  <p className="mono-label text-xs text-(--accent)">
                    0{index + 1}
                  </p>

                  <h3 className="mt-4 text-2xl font-semibold text-(--text)">
                    {step.title}
                  </h3>

                  <p className="mt-3 leading-7 text-(--muted)">
                    {step.copy}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Supporting media */}
          {supportingMedia.length > 0 ? (
            <section className="mt-16 sm:mt-20 lg:mt-24">
              <SectionHeading
                label="Supporting Visuals"
                number="03"
                title={
                  isVideoProject
                    ? 'Posters, covers, and related images for this video.'
                    : 'Visual support frames.'
                }
              />

              <ProjectMediaGallery
                media={supportingMedia}
              />
            </section>
          ) : null}

          {/* Tools and responsibilities */}
          <section className="mt-16 grid gap-10 sm:mt-20 md:grid-cols-2 lg:mt-24">
            <div className="border-t border-(--line) pt-6">
              <h2 className="mono-label text-xs font-bold text-(--accent)">
                Tools
              </h2>

              <div className="mt-5 flex flex-wrap gap-3">
                {project.tools.map((tool) => (
                  <span
                    className="rounded-sm border border-(--line) px-3 py-2 text-sm leading-5 text-(--muted)"
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
                    className="rounded-sm border border-(--line) px-3 py-2 text-sm leading-5 text-(--muted)"
                    key={role}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Next project */}
          {nextProject ? (
            <section className="mt-16 flex flex-col gap-6 border-y border-(--line) py-8 sm:mt-20 sm:flex-row sm:items-center sm:justify-between lg:mt-24">
              <div>
                <p className="mono-label text-xs text-(--accent)">
                  Next project
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-(--text) sm:text-3xl">
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
        </div>
      </article>

      <ContactCTA />
    </PageLayout>
  )
}