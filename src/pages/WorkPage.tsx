import { useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ContactCTA } from '../components/common/ContactCTA'
import { PageLayout } from '../components/layout/PageLayout'
import { ProjectCard } from '../components/work/ProjectCard'
import {
  projectCategories,
  videoProjects,
} from '../data/projects'
import type { ProjectCategory } from '../types/project'

type ActiveFilter = 'all' | ProjectCategory

interface FilterOption {
  value: ActiveFilter
  label: string
}

export function WorkPage() {
  const [activeFilter, setActiveFilter] =
    useState<ActiveFilter>('all')

  const [activePreviewId, setActivePreviewId] =
    useState<string | null>(null)

  const filterOptions = useMemo<FilterOption[]>(
    () => {
      const categoryOptions: FilterOption[] =
        projectCategories
          .filter(
            (category) =>
              category.value !== 'all',
          )
          .map((category) => ({
            value:
              category.value as ProjectCategory,
            label: category.label,
          }))

      return [
        {
          value: 'all',
          label: 'All videos',
        },
        ...categoryOptions,
      ]
    },
    [],
  )

  const filterCounts = useMemo(() => {
    const counts = new Map<
      ActiveFilter,
      number
    >()

    counts.set('all', videoProjects.length)

    filterOptions.forEach((option) => {
      if (option.value === 'all') {
        return
      }

      const selectedCategory: ProjectCategory =
        option.value

      const count = videoProjects.filter(
        (project) =>
          project.categories.includes(
            selectedCategory,
          ),
      ).length

      counts.set(selectedCategory, count)
    })

    return counts
  }, [filterOptions])

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return videoProjects
    }

    const selectedCategory: ProjectCategory =
      activeFilter

    return videoProjects.filter((project) =>
      project.categories.includes(
        selectedCategory,
      ),
    )
  }, [activeFilter])

  const featuredProject = filteredProjects[0]

  const archiveProjects =
    filteredProjects.slice(1)

  const activeFilterLabel =
    filterOptions.find(
      (option) =>
        option.value === activeFilter,
    )?.label ?? 'All videos'

  const handleFilterChange = (
    value: ActiveFilter,
  ) => {
    if (value === activeFilter) {
      return
    }

    setActivePreviewId(null)
    setActiveFilter(value)
  }

  const videoCountLabel =
    filteredProjects.length === 1
      ? 'video'
      : 'videos'

  return (
    <PageLayout
      description="Browse JackNex Creative finished video edits, music teasers, event recaps, and vertical cuts."
      title="Work"
    >
      <main>
        <section className="section-shell pb-16 pt-6 sm:pb-24 sm:pt-10 lg:pb-28">
          <header className="grid gap-7 border-b border-[var(--line)] pb-8 sm:gap-8 sm:pb-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
            <div className="max-w-5xl">
              <p className="mono-label text-[10px] font-bold tracking-[0.16em] text-[var(--accent)] sm:text-xs">
                Video Work
              </p>

              <h1 className="display-type mt-3 max-w-5xl text-[clamp(3rem,14vw,6.75rem)] leading-[0.88] text-[var(--text)] sm:mt-4">
                Selected cuts.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base sm:leading-8 lg:text-lg">
                Finished music teasers, event
                recaps, and vertical edits.
                Posters and cover images stay
                inside their related video
                projects as supporting visuals.
              </p>
            </div>

            <aside className="hidden border-y border-[var(--line)] py-5 sm:block lg:border lg:bg-[var(--surface)]/40 lg:p-5">
              <p className="mono-label text-xs font-bold text-[var(--accent)]">
                Archive clarity
              </p>

              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                Main Work shows video projects
                only. Posters, thumbnails and
                still images are kept as
                supporting material inside the
                project detail pages.
              </p>
            </aside>
          </header>

          <section
            aria-labelledby="work-filter-heading"
            className="mt-7 border-y border-[var(--line)] py-5 sm:mt-10 sm:py-6"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
              <div>
                <h2
                  className="mono-label text-[10px] font-bold tracking-[0.14em] text-[var(--accent)] sm:text-xs"
                  id="work-filter-heading"
                >
                  Filter by video type
                </h2>

                <p
                  aria-live="polite"
                  className="mt-2 text-sm leading-6 text-[var(--muted)]"
                >
                  Showing{' '}
                  {filteredProjects.length}{' '}
                  {videoCountLabel} in{' '}
                  {activeFilterLabel.toLowerCase()}.
                </p>
              </div>
            </div>

            <div
              aria-label="Filter video projects"
              className="-mx-4 mt-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0"
              role="group"
            >
              {filterOptions.map((option) => {
                const isActive =
                  activeFilter === option.value

                const count =
                  filterCounts.get(
                    option.value,
                  ) ?? 0

                return (
                  <button
                    aria-controls="work-projects"
                    aria-pressed={isActive}
                    className={[
                      'mono-label flex min-h-11 shrink-0 snap-start touch-manipulation items-center justify-between gap-3 whitespace-nowrap rounded-[4px] border px-4 text-[10px] font-bold tracking-[0.08em]',
                      'transition duration-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2',
                      'focus-visible:ring-offset-[var(--background)]',
                      'sm:justify-center sm:text-xs',
                      'motion-reduce:transition-none',
                      isActive
                        ? 'border-[var(--accent)] bg-[var(--accent)] text-black'
                        : 'border-[var(--line)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]',
                    ].join(' ')}
                    key={option.value}
                    onClick={() =>
                      handleFilterChange(
                        option.value,
                      )
                    }
                    type="button"
                  >
                    <span>{option.label}</span>

                    <span
                      aria-label={`${count} projects`}
                      className={[
                        'rounded-full px-2 py-1 text-[9px] leading-none sm:text-[10px]',
                        isActive
                          ? 'bg-black/15 text-black'
                          : 'bg-[var(--surface)] text-[var(--subtle)]',
                      ].join(' ')}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          <div id="work-projects">
            {featuredProject ? (
              <>
                <section
                  aria-labelledby="featured-project-heading"
                  className="mt-9 grid gap-7 sm:mt-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start xl:grid-cols-[minmax(0,1fr)_20rem]"
                >
                  <div className="min-w-0">
                    <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                      <div className="min-w-0">
                        <p className="mono-label text-[10px] font-bold tracking-[0.14em] text-[var(--accent)] sm:text-xs">
                          Featured Cut
                        </p>

                        <h2
                          className="mt-2 break-words text-xl font-semibold leading-tight text-[var(--text)] sm:text-2xl lg:text-3xl"
                          id="featured-project-heading"
                        >
                          {featuredProject.title}
                        </h2>
                      </div>

                      <p className="mono-label shrink-0 text-[10px] text-[var(--muted)] sm:text-xs">
                        {
                          featuredProject.projectType
                        }{' '}
                        / {featuredProject.year}
                      </p>
                    </div>

                    <ProjectCard
                      activePreviewId={
                        activePreviewId
                      }
                      index={0}
                      key={featuredProject.slug}
                      onPreviewRequest={
                        setActivePreviewId
                      }
                      project={featuredProject}
                      variant="wide"
                    />
                  </div>

                  <aside className="border-t border-[var(--line)] pt-5 lg:sticky lg:top-28">
                    <p className="mono-label text-[10px] font-bold tracking-[0.14em] text-[var(--accent)] sm:text-xs">
                      Project Details
                    </p>

                    <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 text-sm sm:grid-cols-3 lg:grid-cols-1">
                      <div className="min-w-0">
                        <dt className="mono-label text-[10px] text-[var(--subtle)] sm:text-xs">
                          Type
                        </dt>

                        <dd className="mt-2 break-words leading-6 text-[var(--text)]">
                          {
                            featuredProject.projectType
                          }
                        </dd>
                      </div>

                      <div className="min-w-0">
                        <dt className="mono-label text-[10px] text-[var(--subtle)] sm:text-xs">
                          Role
                        </dt>

                        <dd className="mt-2 break-words leading-6 text-[var(--text)]">
                          {featuredProject.roles.join(
                            ' / ',
                          )}
                        </dd>
                      </div>

                      <div className="min-w-0">
                        <dt className="mono-label text-[10px] text-[var(--subtle)] sm:text-xs">
                          Format
                        </dt>

                        <dd className="mt-2 leading-6 text-[var(--text)]">
                          {featuredProject.fullVideo
                            ?.orientation ===
                          'portrait'
                            ? 'Vertical video'
                            : 'Landscape video'}
                        </dd>
                      </div>
                    </dl>
                  </aside>
                </section>

                <section
                  aria-labelledby="video-archive-heading"
                  className="mt-14 sm:mt-16"
                >
                  <p className="mono-label text-[10px] font-bold tracking-[0.14em] text-[var(--accent)] sm:text-xs">
                    Video Archive
                  </p>

                  <h2
                    className="sr-only"
                    id="video-archive-heading"
                  >
                    Additional video projects
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base sm:leading-8 lg:text-lg">
                    Every project opens with the
                    finished video. Supporting
                    images appear after the main
                    film on its project page.
                  </p>
                </section>

                {archiveProjects.length > 0 ? (
                  <div className="mt-8 grid gap-x-6 gap-y-12 sm:mt-9 sm:gap-y-14 md:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
                    <AnimatePresence
                      initial={false}
                      mode="popLayout"
                    >
                      {archiveProjects.map(
                        (project, index) => (
                          <ProjectCard
                            activePreviewId={
                              activePreviewId
                            }
                            index={index + 1}
                            key={project.slug}
                            onPreviewRequest={
                              setActivePreviewId
                            }
                            project={project}
                          />
                        ),
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="mt-8 border border-[var(--line)] bg-[var(--surface)]/35 px-5 py-9 text-center sm:mt-9 sm:px-6 sm:py-10">
                    <p className="mx-auto max-w-xl text-sm leading-7 text-[var(--muted)] sm:text-base">
                      This category currently has
                      one finished video. It is
                      displayed as the featured
                      project above.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <section className="mt-10 border border-[var(--line)] bg-[var(--surface)]/35 px-5 py-12 text-center sm:mt-12 sm:px-8 sm:py-16">
                <p className="mono-label text-[10px] font-bold tracking-[0.14em] text-[var(--accent)] sm:text-xs">
                  No videos found
                </p>

                <h2 className="display-type mt-3 text-3xl text-[var(--text)] sm:text-4xl">
                  Nothing in this category yet.
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--muted)] sm:text-base">
                  Select another video category or
                  return to All videos to browse
                  the complete archive.
                </p>

                <button
                  className="mono-label mt-6 min-h-11 touch-manipulation rounded-[4px] border border-[var(--accent)] bg-[var(--accent)] px-5 text-xs font-bold text-black transition hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
                  onClick={() =>
                    handleFilterChange('all')
                  }
                  type="button"
                >
                  Show all videos
                </button>
              </section>
            )}
          </div>
        </section>

        <ContactCTA />
      </main>
    </PageLayout>
  )
}