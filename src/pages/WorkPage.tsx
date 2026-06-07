import { useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { PageLayout } from '../components/layout/PageLayout'
import { ProjectCard } from '../components/work/ProjectCard'
import { projectCategories, projects } from '../data/projects'
import type { ProjectCategory } from '../types/project'

type ActiveFilter = 'all' | ProjectCategory

export function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>('all')
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return projects
    }
    return projects.filter((project) => project.categories.includes(activeFilter))
  }, [activeFilter])

  return (
    <PageLayout
      description="Browse JackNex Creative video editing, motion design, graphic design, branding, and social media projects."
      title="Work"
    >
      <section className="section-shell pb-16 pt-10 sm:pb-24">
        <div className="max-w-5xl">
          <p className="mono-label text-xs font-bold text-[var(--accent)]">Work Archive</p>
          <h1 className="display-type mt-5 text-6xl text-[var(--text)] sm:text-8xl">
            Video, motion, and graphic design projects.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            A growing archive of real edits, music teasers, event recaps, poster direction,
            and portfolio identity frames.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3" role="toolbar" aria-label="Project filters">
          {projectCategories.map((category) => (
            <button
              aria-pressed={activeFilter === category.value}
              className={`mono-label min-h-11 rounded-[4px] border px-4 text-xs font-bold transition ${
                activeFilter === category.value
                  ? 'border-[var(--accent)] bg-[var(--accent)] text-black'
                  : 'border-[var(--line)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
              }`}
              key={category.value}
              onClick={() => setActiveFilter(category.value)}
              type="button"
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false} mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                index={index}
                key={project.slug}
                project={project}
                variant={index % 5 === 0 ? 'wide' : index % 4 === 0 ? 'tall' : 'standard'}
              />
            ))}
          </AnimatePresence>
        </div>
      </section>
    </PageLayout>
  )
}
