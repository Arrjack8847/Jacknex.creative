import { motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowUpRight,
  Headphones,
  MapPin,
} from 'lucide-react'
import { Button } from '../components/common/Button'
import { ContactCTA } from '../components/common/ContactCTA'
import { SectionLabel } from '../components/common/SectionLabel'
import { SectionHeading } from '../components/common/SectionHeading'
import { SocialLinks } from '../components/common/SocialLinks'
import { VideoPlayer } from '../components/common/VideoPlayer'
import { PageLayout } from '../components/layout/PageLayout'
import { ProjectCard } from '../components/work/ProjectCard'
import { projects } from '../data/projects'
import { aboutSocialLinks } from '../data/socialLinks'
import { siteConfig } from '../data/siteConfig'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const motionDisciplines = [
  'Short-form reels',
  'Cinematic editing',
  'Promotional videos',
  'Wedding films',
  'Colour grading',
  'Sound design',
  'Motion graphics',
]

const designDisciplines = [
  'Social media campaigns',
  'Posters',
  'Thumbnails',
  'Promotional graphics',
  'Brand visuals',
  'Event designs',
  'Motion posters',
]

const disciplineGroups = [
  {
    number: '01',
    title: 'Motion',
    label: 'Video and movement',
    copy: 'Editing, pacing, sound, colour, and motion crafted into cinematic visual stories.',
    items: motionDisciplines,
  },
  {
    number: '02',
    title: 'Design',
    label: 'Visual communication',
    copy: 'Modern campaign visuals and graphic systems designed to communicate with clarity.',
    items: designDisciplines,
  },
]

const revealTransition = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1] as const,
}

/*
|--------------------------------------------------------------------------
| IMAGE POSITION CONTROLS
|--------------------------------------------------------------------------
|
| Change these values to reposition your images.
|
| Value format:
| 'horizontal vertical'
|
| Horizontal:
| 0%   = far left
| 50%  = centre
| 100% = far right
|
| Vertical:
| 0%   = top
| 50%  = centre
| 100% = bottom
|
*/

const mediaPositionControls = {
  hero: {
    mobile: '65% 110%',
    tablet: '50% 50%',
    desktop: '50% 50%',
  },

  about: {
    mobile: '50% 25%',
    tablet: '50% 50%',
    desktop: '50% 50%',
  },
} as const

/*
|--------------------------------------------------------------------------
| RESPONSIVE IMAGE POSITION STYLES
|--------------------------------------------------------------------------
|
| Mobile: below 640px
| Tablet: 640px and above
| Desktop: 1024px and above
|
*/

const mediaPositionStyles = `
  .home-hero-media {
    object-position: ${mediaPositionControls.hero.mobile};
  }

  .home-about-image {
    object-position: ${mediaPositionControls.about.mobile};
  }

  @media (min-width: 640px) {
    .home-hero-media {
      object-position: ${mediaPositionControls.hero.tablet};
    }

    .home-about-image {
      object-position: ${mediaPositionControls.about.tablet};
    }
  }

  @media (min-width: 1024px) {
    .home-hero-media {
      object-position: ${mediaPositionControls.hero.desktop};
    }

    .home-about-image {
      object-position: ${mediaPositionControls.about.desktop};
    }
  }
`

export function HomePage() {
  const prefersReducedMotion = usePrefersReducedMotion()

  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 4)

  const revealInitial = prefersReducedMotion
    ? false
    : {
        opacity: 0,
        y: 24,
      }

  const revealInView = prefersReducedMotion
    ? undefined
    : {
        opacity: 1,
        y: 0,
      }

  return (
    <PageLayout
      className="pt-0"
      description={siteConfig.seoDescription}
      title={siteConfig.seoTitle}
    >
      {/* Responsive media-position CSS */}
      <style>{mediaPositionStyles}</style>

      {/* Hero */}
      <section className="noise-surface relative flex min-h-[100svh] items-end overflow-hidden bg-black">
        <div className="absolute inset-0">
          {siteConfig.media.heroVideo && !prefersReducedMotion ? (
            <video
              aria-hidden="true"
              autoPlay
              className="home-hero-media h-full w-full scale-[1.02] object-cover"
              loop
              muted
              playsInline
              poster={siteConfig.media.heroPoster.src}
              preload="metadata"
              src={siteConfig.media.heroVideo}
            />
          ) : (
            <img
              alt={siteConfig.media.heroPoster.alt}
              className="home-hero-media h-full w-full scale-[1.02] object-cover"
              fetchPriority="high"
              src={siteConfig.media.heroPoster.src}
            />
          )}

          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-black/25" />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/10" />

          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-black/20 to-black/40" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,transparent_0%,rgba(0,0,0,0.12)_35%,rgba(0,0,0,0.78)_100%)]" />

          {/* Accent glow */}
          <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-[var(--accent)]/10 blur-[120px]" />

          <div className="grain opacity-60" />
        </div>

        <div className="section-shell relative z-10 w-full pb-12 pt-24 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-20">
          <motion.div
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="max-w-6xl"
            initial={
              prefersReducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 30,
                  }
            }
            transition={revealTransition}
          >
            <div className="mb-7 flex flex-wrap items-center gap-3">
              <span className="mono-label inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/55">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />

                Available for selected projects
              </span>
            </div>

            <h1 className="display-type max-w-5xl text-[clamp(4rem,11vw,9.5rem)] leading-[0.82] tracking-[-0.055em] text-white">
              I EDIT
              <br />

              <span className="relative inline-block text-[var(--accent)]">
                STORIES.
              </span>

              <br />

              <span className="text-white/95">
                I DESIGN IMPACT.
              </span>
            </h1>

            <div className="mt-9 grid max-w-5xl gap-8 border-t border-white/15 pt-7 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-2xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
                {siteConfig.description}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button to="/work">
                  Explore My Work
                </Button>

                <Button
                  to="/contact"
                  variant="secondary"
                >
                  Start a Project
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="mt-16 flex items-end justify-between sm:mt-20">
            <div className="hidden items-center gap-3 text-white/50 sm:flex">
              <ArrowDown size={15} />

              <span className="mono-label text-[10px] uppercase tracking-[0.2em]">
                Scroll to explore
              </span>
            </div>

            <div className="mono-label ml-auto text-right text-[10px] uppercase leading-5 tracking-[0.18em] text-white/45">
              Based in Malaysia
              <br />
              Working worldwide
            </div>
          </div>
        </div>
      </section>

      {/* Creative statement */}
      <section className="section-shell py-20 sm:py-28 lg:py-36">
        <motion.div
          initial={revealInitial}
          transition={revealTransition}
          viewport={{
            once: true,
            margin: '-100px',
          }}
          whileInView={revealInView}
        >
          <div className="mb-10 flex items-center gap-4">
            <span className="mono-label text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
              Creative direction
            </span>

            <span className="h-px flex-1 bg-[var(--line)]" />
          </div>

          <p className="max-w-6xl text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-[var(--text)] sm:text-5xl lg:text-7xl">
            I turn raw footage and simple ideas into{' '}

            <span className="text-[var(--muted)]">
              visual experiences that attract attention,
            </span>{' '}

            communicate emotion, and leave a lasting impression.
          </p>
        </motion.div>
      </section>

      {/* Featured work */}
      <section className="section-shell py-16 sm:py-24">
        <div className="mb-12 flex flex-col gap-7 border-b border-[var(--line)] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            label="Selected projects"
            number="01"
            title="Stories, campaigns, and motion crafted with intention."
          />

          <Button
            to="/work"
            variant="ghost"
          >
            View All Work
          </Button>
        </div>

        {featuredProjects.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <motion.div
                initial={revealInitial}
                key={project.slug}
                transition={{
                  ...revealTransition,
                  delay: index * 0.06,
                }}
                viewport={{
                  once: true,
                  margin: '-60px',
                }}
                whileInView={revealInView}
              >
                <ProjectCard
                  index={index}
                  project={project}
                  variant={
                    index === 0 || index === 3
                      ? 'wide'
                      : 'standard'
                  }
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="border border-[var(--line)] px-6 py-16 text-center">
            <p className="text-[var(--muted)]">
              Featured projects will be added soon.
            </p>
          </div>
        )}
      </section>

      {/* Showreel */}
      <section className="wide-shell py-16 sm:py-24">
        <motion.div
          className="overflow-hidden border border-[var(--line)] bg-[var(--surface)]"
          initial={revealInitial}
          transition={revealTransition}
          viewport={{
            once: true,
            margin: '-100px',
          }}
          whileInView={revealInView}
        >
          <div className="section-shell flex flex-col gap-8 border-b border-[var(--line)] py-8 sm:flex-row sm:items-end sm:justify-between sm:py-10">
            <SectionHeading
              copy="A vertical music teaser showing mobile-first pacing, rhythm, sound timing, and concise motion direction."
              label="Selected motion"
              number="02"
              title="Music Teaser"
            />

            <div className="mono-label flex shrink-0 items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
              <Headphones size={15} />

              Headphones recommended
            </div>
          </div>

          <div className="relative bg-black p-2 sm:p-3">
            <VideoPlayer
              className="mx-auto max-h-[78vh] max-w-[520px]"
              duration={siteConfig.media.showreel.duration}
              height={siteConfig.media.showreel.height}
              orientation={siteConfig.media.showreel.orientation}
              poster={
                siteConfig.media.showreel.poster ??
                siteConfig.media.showreel.src
              }
              title={
                siteConfig.media.showreel.title ??
                'Music Teaser'
              }
              videoSrc={siteConfig.media.showreel.src}
              width={siteConfig.media.showreel.width}
            />
          </div>
        </motion.div>
      </section>

      {/* Disciplines */}
      <section className="section-shell py-20 sm:py-28">
        <SectionHeading
          copy="One connected visual approach for projects that need atmosphere, rhythm, clarity, and a recognisable identity."
          label="Creative disciplines"
          number="03"
          title="Motion and design, built to work together."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {disciplineGroups.map((discipline, index) => (
            <motion.article
              className="group relative overflow-hidden border border-[var(--line)] bg-[var(--surface)] p-6 transition-colors duration-500 hover:border-[var(--accent)]/45 sm:p-9"
              initial={revealInitial}
              key={discipline.title}
              transition={{
                ...revealTransition,
                delay: index * 0.1,
              }}
              viewport={{
                once: true,
                margin: '-80px',
              }}
              whileInView={revealInView}
            >
              <div className="absolute right-0 top-0 h-44 w-44 translate-x-1/3 -translate-y-1/3 rounded-full bg-[var(--accent)]/0 blur-3xl transition-colors duration-500 group-hover:bg-[var(--accent)]/10" />

              <div className="relative">
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-6">
                  <span className="mono-label text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                    {discipline.number}
                  </span>

                  <ArrowUpRight
                    className="text-[var(--muted)] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--accent)]"
                    size={19}
                  />
                </div>

                <p className="mono-label mt-8 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                  {discipline.label}
                </p>

                <h3 className="display-type mt-3 text-6xl leading-none text-[var(--text)] sm:text-7xl">
                  {discipline.title}
                </h3>

                <p className="mt-5 max-w-lg text-base leading-7 text-[var(--muted)]">
                  {discipline.copy}
                </p>

                <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {discipline.items.map((item) => (
                    <li
                      className="flex items-center gap-3 text-sm text-[var(--text)] sm:text-base"
                      key={item}
                    >
                      <span className="h-px w-6 bg-[var(--accent)] transition-all duration-300 group-hover:w-9" />

                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="section-shell py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center xl:gap-16">
          <motion.div
            className="relative"
            initial={
              prefersReducedMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.98,
                  }
            }
            transition={revealTransition}
            viewport={{
              once: true,
              margin: '-100px',
            }}
            whileInView={
              prefersReducedMotion
                ? undefined
                : {
                    opacity: 1,
                    scale: 1,
                  }
            }
          >
            <div className="relative overflow-hidden rounded-[6px] border border-[var(--line-strong)] bg-[var(--surface)] shadow-[0_24px_90px_rgba(0,0,0,0.42),0_0_0_1px_rgba(215,140,45,0.08)]">
              <img
                alt={siteConfig.media.aboutWorkspace.alt}
                className="home-about-image aspect-[3/4] h-full w-full object-cover transition-transform duration-700 hover:scale-[1.025]"
                loading="lazy"
                src={siteConfig.media.aboutWorkspace.src}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                <div>
                  <p className="mono-label text-[10px] uppercase tracking-[0.2em] text-white/55">
                    Creative based in
                  </p>

                  <p className="mt-2 flex items-center gap-2 text-sm text-white">
                    <MapPin size={15} />

                    Malaysia
                  </p>
                </div>

                <span className="mono-label border border-white/20 bg-black/30 px-3 py-2 text-[9px] uppercase tracking-[0.17em] text-white/70 backdrop-blur-md">
                  JackNex Creative
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col justify-center"
            initial={revealInitial}
            transition={revealTransition}
            viewport={{
              once: true,
              margin: '-100px',
            }}
            whileInView={revealInView}
          >
            <SectionLabel
              label="ABOUT ME"
              number="04"
            />

            <h2 className="display-type mt-5 max-w-3xl text-5xl text-[var(--text)] sm:text-6xl lg:text-7xl">
              Creative work shaped by story, motion and design.
            </h2>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl sm:leading-9">
              I&apos;m Jack, a video editor and graphic designer focused on
              music videos, event films, promotional content, and expressive
              digital visuals.
            </p>

            <div className="mt-8 grid gap-4 border-y border-[var(--line)] py-6 text-sm sm:grid-cols-2">
              <div>
                <p className="mono-label text-[10px] uppercase tracking-[0.18em] text-[var(--subtle)]">
                  Role
                </p>

                <p className="mt-2 text-[var(--text)]">
                  Video Editor & Graphic Designer
                </p>
              </div>

              <div>
                <p className="mono-label text-[10px] uppercase tracking-[0.18em] text-[var(--subtle)]">
                  Location
                </p>

                <p className="mt-2 text-[var(--text)]">
                  Based in Malaysia
                </p>
              </div>
            </div>

            <SocialLinks
              className="mt-8"
              iconSize={19}
              linkClassName="h-[46px] w-[46px]"
              links={aboutSocialLinks}
            />

            <div className="mt-10">
              <Button
                to="/about"
                variant="secondary"
              >
                More About Me
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <ContactCTA />
    </PageLayout>
  )
}