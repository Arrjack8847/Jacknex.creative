import {
  useCallback,
  useMemo,
  useState,
} from 'react'
import { AnimatePresence } from 'framer-motion'
import { ArrowRight, Film } from 'lucide-react'
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

function getProjectCountLabel(count: number) {
  return count === 1 ? 'video' : 'videos'
}

export function WorkPage() {
  const [activeFilter, setActiveFilter] =
    useState<ActiveFilter>('all')

  const [activePreviewId, setActivePreviewId] =
    useState<string | null>(null)

  const filterOptions = useMemo<FilterOption[]>(() => {
    const categoryOptions = projectCategories
      .filter((category) => category.value !== 'all')
      .map<FilterOption>((category) => ({
        value: category.value as ProjectCategory,
        label: category.label,
      }))

    return [
      {
        value: 'all',
        label: 'All videos',
      },
      ...categoryOptions,
    ]
  }, [])

  const filterCounts = useMemo(() => {
    const counts = new Map<ActiveFilter, number>()

    counts.set('all', videoProjects.length)

    filterOptions.forEach((option) => {
      if (option.value === 'all') {
        return
      }

      const selectedCategory: ProjectCategory =
        option.value

      const count = videoProjects.filter((project) =>
        project.categories.includes(selectedCategory),
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
      project.categories.includes(selectedCategory),
    )
  }, [activeFilter])

  const featuredProject = filteredProjects[0]
  const archiveProjects = filteredProjects.slice(1)

  const handleFilterChange = useCallback(
    (value: ActiveFilter) => {
      if (value === activeFilter) {
        return
      }

      setActivePreviewId(null)
      setActiveFilter(value)
    },
    [activeFilter],
  )

  const handleShowAll = useCallback(() => {
    setActivePreviewId(null)
    setActiveFilter('all')
  }, [])

  return (
    <PageLayout
      description="Browse JackNex Creative finished video edits, music teasers, event recaps, and vertical cuts."
      title="Work"
    >
      <main>
        <section className="section-shell pb-16 pt-6 sm:pb-24 sm:pt-10 lg:pb-28">
          {/* Page heading */}
          <header className="relative overflow-hidden border-b border-[var(--line)] pb-9 sm:pb-12 lg:pb-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[var(--accent)]/5 blur-3xl"
            />

            <div className="relative max-w-5xl">
              <div className="flex flex-wrap items-center gap-3">
                <p className="mono-label text-[10px] font-bold tracking-[0.16em] text-[var(--accent)] sm:text-xs">
                  Video Work
                </p>

                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-[var(--line)]"
                />

                <p className="mono-label text-[10px] tracking-[0.12em] text-[var(--subtle)] sm:text-xs">
                  {videoProjects.length}{' '}
                  {getProjectCountLabel(
                    videoProjects.length,
                  )}
                </p>
              </div>

              <h1 className="display-type mt-4 max-w-5xl break-words text-[clamp(3rem,11vw,7.5rem)] leading-[0.84] tracking-[-0.045em] text-[var(--text)]">
                Selected cuts.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
                A curated collection of finished music
                teasers, event recaps, cinematic edits
                and vertical content.
              </p>
            </div>
          </header>

          {/* Filters */}
          <section
            aria-label="Video project filters"
            className="mt-6 sm:mt-10"
          >
            <div
              aria-label="Filter video projects"
              className="-mx-4 flex snap-x snap-mandatory gap-1.5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0"
              role="group"
            >
              {filterOptions.map((option) => {
                const isActive =
                  activeFilter === option.value

                const count =
                  filterCounts.get(option.value) ?? 0

                const countLabel =
                  getProjectCountLabel(count)

                return (
                  <button
                    aria-controls="work-projects"
                    aria-label={`${option.label}, ${count} ${countLabel}`}
                    aria-pressed={isActive}
                    className={[
                      'mono-label flex min-h-9 shrink-0 snap-start touch-manipulation items-center justify-center gap-1.5 whitespace-nowrap rounded-[4px] border px-2.5 text-[9px] font-bold tracking-[0.06em]',
                      'sm:min-h-11 sm:gap-3 sm:px-4 sm:text-xs sm:tracking-[0.08em]',
                      'transition-[background-color,border-color,color,transform,box-shadow] duration-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2',
                      'focus-visible:ring-offset-[var(--background)]',
                      'active:scale-[0.97]',
                      'motion-reduce:transition-none',
                      isActive
                        ? 'border-[var(--accent)] bg-[var(--accent)] text-black shadow-[0_6px_20px_rgba(0,0,0,0.1)]'
                        : 'border-[var(--line)] bg-[var(--surface)]/30 text-[var(--muted)] hover:border-[var(--accent)] hover:bg-[var(--surface)] hover:text-[var(--accent)]',
                    ].join(' ')}
                    key={option.value}
                    onClick={() =>
                      handleFilterChange(option.value)
                    }
                    type="button"
                  >
                    <span>{option.label}</span>

                    <span
                      aria-hidden="true"
                      className={[
                        'min-w-5 rounded-full px-1.5 py-0.5 text-center text-[8px] leading-none',
                        'sm:min-w-6 sm:px-2 sm:py-1 sm:text-[10px]',
                        isActive
                          ? 'bg-black/15 text-black'
                          : 'bg-[var(--background)] text-[var(--subtle)]',
                      ].join(' ')}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Project results */}
          <div
            className="scroll-mt-28"
            id="work-projects"
          >
            {featuredProject ? (
              <>
                {/* Featured project */}
                <section
                  aria-labelledby="featured-project-heading"
                  className="mt-10 sm:mt-14"
                >
                  <div className="mb-6 flex flex-col gap-4 border-b border-[var(--line)] pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                    <div className="min-w-0">
                      <p className="mono-label text-[10px] font-bold tracking-[0.14em] text-[var(--accent)] sm:text-xs">
                        Featured Cut
                      </p>

                      <h2
                        className="mt-2 break-words text-2xl font-semibold leading-tight tracking-[-0.025em] text-[var(--text)] sm:text-3xl lg:text-4xl"
                        id="featured-project-heading"
                      >
                        {featuredProject.title}
                      </h2>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <span className="mono-label text-[10px] text-[var(--muted)] sm:text-xs">
                        {featuredProject.projectType}
                      </span>

                      <span
                        aria-hidden="true"
                        className="size-1 rounded-full bg-[var(--accent)]"
                      />

                      <span className="mono-label text-[10px] text-[var(--muted)] sm:text-xs">
                        {featuredProject.year}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-9">
                    <div className="min-w-0">
                      <ProjectCard
                        activePreviewId={
                          activePreviewId
                        }
                        index={0}
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

                      <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-6 text-sm sm:grid-cols-3 lg:grid-cols-1">
                        <div className="min-w-0">
                          <dt className="mono-label text-[10px] text-[var(--subtle)] sm:text-xs">
                            Type
                          </dt>

                          <dd className="mt-2 break-words leading-6 text-[var(--text)]">
                            {featuredProject.projectType}
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
                              ?.orientation === 'portrait'
                              ? 'Vertical video'
                              : 'Landscape video'}
                          </dd>
                        </div>

                        <div className="min-w-0">
                          <dt className="mono-label text-[10px] text-[var(--subtle)] sm:text-xs">
                            Year
                          </dt>

                          <dd className="mt-2 leading-6 text-[var(--text)]">
                            {featuredProject.year}
                          </dd>
                        </div>
                      </dl>
                    </aside>
                  </div>
                </section>

                {/* Archive heading */}
                <section
                  aria-labelledby="video-archive-heading"
                  className="mt-16 border-t border-[var(--line)] pt-8 sm:mt-20 sm:pt-10"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                    <div>
                      <p className="mono-label text-[10px] font-bold tracking-[0.14em] text-[var(--accent)] sm:text-xs">
                        Video Archive
                      </p>

                      <h2
                        className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--text)] sm:text-4xl"
                        id="video-archive-heading"
                      >
                        More selected work.
                      </h2>

                      <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base sm:leading-8">
                        Browse the remaining projects
                        in this category. Open any
                        project to watch its finished
                        video and explore its
                        supporting visuals.
                      </p>
                    </div>

                    {archiveProjects.length > 0 ? (
                      <p className="mono-label shrink-0 text-[10px] tracking-[0.12em] text-[var(--subtle)] sm:text-xs">
                        {archiveProjects.length}{' '}
                        {getProjectCountLabel(
                          archiveProjects.length,
                        )}
                      </p>
                    ) : null}
                  </div>
                </section>

                {/* Archive project cards */}
                {archiveProjects.length > 0 ? (
                  <div className="mt-8 grid gap-x-6 gap-y-12 sm:mt-10 sm:gap-y-14 md:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
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
                  <div className="mt-8 border border-[var(--line)] bg-[var(--surface)]/35 px-5 py-10 text-center sm:mt-10 sm:px-8 sm:py-12">
                    <Film
                      aria-hidden="true"
                      className="mx-auto text-[var(--accent)]"
                      size={24}
                    />

                    <h3 className="mt-4 text-xl font-semibold text-[var(--text)]">
                      One project in this category
                    </h3>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--muted)] sm:text-base">
                      The available video is already
                      displayed as the featured
                      project above.
                    </p>

                    {activeFilter !== 'all' ? (
                      <button
                        className="mono-label mt-6 inline-flex min-h-11 touch-manipulation items-center justify-center gap-2 rounded-[4px] border border-[var(--line)] px-5 text-xs font-bold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                        onClick={handleShowAll}
                        type="button"
                      >
                        Browse all videos
                        <ArrowRight size={15} />
                      </button>
                    ) : null}
                  </div>
                )}
              </>
            ) : (
              <section className="mt-12 border border-[var(--line)] bg-[var(--surface)]/35 px-5 py-14 text-center sm:mt-14 sm:px-8 sm:py-20">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-[var(--line)] text-[var(--accent)]">
                  <Film size={20} />
                </div>

                <p className="mono-label mt-5 text-[10px] font-bold tracking-[0.14em] text-[var(--accent)] sm:text-xs">
                  No videos found
                </p>

                <h2 className="display-type mt-3 text-4xl leading-none text-[var(--text)] sm:text-5xl">
                  Nothing here yet.
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[var(--muted)] sm:text-base">
                  Select another category or return to
                  All videos to browse the complete
                  collection.
                </p>

                <button
                  className="mono-label mt-7 inline-flex min-h-11 touch-manipulation items-center justify-center gap-2 rounded-[4px] border border-[var(--accent)] bg-[var(--accent)] px-5 text-xs font-bold text-black transition hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                  onClick={handleShowAll}
                  type="button"
                >
                  Show all videos
                  <ArrowRight size={15} />
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