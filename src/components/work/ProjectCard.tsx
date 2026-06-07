import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categoryLabels } from '../../data/projects'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../lib/cn'
import type { Project, ProjectMediaOrientation } from '../../types/project'
import { MediaPlaceholder } from '../common/MediaPlaceholder'

interface ProjectCardProps {
  project: Project
  index?: number
  variant?: 'standard' | 'wide' | 'tall'
}

const placeholderAspectByOrientation: Record<ProjectMediaOrientation, 'portrait' | 'square' | 'video'> = {
  landscape: 'video',
  portrait: 'portrait',
  square: 'square',
}

export function ProjectCard({ project, index = 0, variant = 'standard' }: ProjectCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const tone = index % 3 === 0 ? 'amber' : index % 3 === 1 ? 'silver' : 'graphite'
  const cover = project.cover
  const effectiveVariant = cover.orientation === 'portrait' ? 'tall' : variant

  return (
    <motion.article
      className={cn(
        'group',
        effectiveVariant === 'wide' && cover.orientation !== 'portrait' && 'md:col-span-2',
        effectiveVariant === 'tall' && 'md:row-span-2',
      )}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
    >
      <Link className="block focus-visible:outline-offset-8" to={`/work/${project.slug}`}>
        <div
          className="media-frame"
          data-media-orientation={cover.orientation}
          style={{ aspectRatio: `${cover.width} / ${cover.height}` }}
        >
          {cover.src ? (
            <img
              alt={cover.alt}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              decoding="async"
              loading="lazy"
              src={cover.src}
            />
          ) : (
            <MediaPlaceholder
              aspect={placeholderAspectByOrientation[cover.orientation]}
              title={project.title}
              tone={tone}
            />
          )}
          <div className="absolute inset-x-0 bottom-0 z-10 p-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="mono-label text-[10px] font-bold text-[var(--accent)]">
                  {project.categories.map((category) => categoryLabels[category]).join(' / ')}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-[var(--text)]">{project.title}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {project.roles[0]} / {project.year}
                </p>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[4px] border border-[var(--line)] text-[var(--accent)] transition group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black">
                <ArrowUpRight size={18} />
              </span>
            </div>
          </div>
        </div>
        <span className="sr-only">View project</span>
      </Link>
    </motion.article>
  )
}
