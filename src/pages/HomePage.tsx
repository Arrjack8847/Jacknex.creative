import { useRef } from 'react'
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
import { useHomeHeroAnimation } from '../hooks/useHomeHeroAnimation'
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

type ResponsiveValue = {
  mobile: string
  tablet: string
  laptop: string
}

/*
|--------------------------------------------------------------------------
| RESPONSIVE CONTROL PANEL
|--------------------------------------------------------------------------
|
| Edit the values below to control the homepage without searching through
| the JSX. Every setting has separate mobile, tablet, and laptop values.
|
| Breakpoints used:
| Mobile:  below 640px
| Tablet:  640px to 1023px
| Laptop:  1024px and above
|
| Useful examples:
| Width:          '100%', '520px', '72rem'
| Spacing:        '24px', '4rem'
| Position:       '65% 50%'
| Alignment:      'left', 'center', 'right'
| Grid columns:   '1fr', 'repeat(2, minmax(0, 1fr))'
|
*/
const responsiveControls = {
  hero: {
    minHeight: {
      mobile: '100svh',
      tablet: '100svh',
      laptop: '100svh',
    },
    mediaPosition: {
      mobile: '67% 50%',
      tablet: '55% 50%',
      laptop: '50% 50%',
    },
    mediaScale: {
      mobile: '1.01',
      tablet: '1.015',
      laptop: '1.02',
    },
    contentPaddingTop: {
      mobile: '7rem',
      tablet: '8rem',
      laptop: '7rem',
    },
    contentPaddingBottom: {
      mobile: '2rem',
      tablet: '3rem',
      laptop: '4rem',
    },
    contentMaxWidth: {
      mobile: '100%',
      tablet: '48rem',
      laptop: '72rem',
    },
    contentAlignment: {
      mobile: 'left',
      tablet: 'left',
      laptop: 'left',
    },
    labelMarginBottom: {
      mobile: '1.25rem',
      tablet: '1.5rem',
      laptop: '1.75rem',
    },
    titleSize: {
      mobile: 'clamp(3.35rem, 17vw, 5rem)',
      tablet: 'clamp(5.5rem, 12vw, 7.5rem)',
      laptop: 'clamp(7rem, 10vw, 9.5rem)',
    },
    titleLineHeight: {
      mobile: '0.86',
      tablet: '0.84',
      laptop: '0.82',
    },
    titleLetterSpacing: {
      mobile: '-0.045em',
      tablet: '-0.05em',
      laptop: '-0.055em',
    },
    detailsMarginTop: {
      mobile: '2rem',
      tablet: '2.25rem',
      laptop: '2.5rem',
    },
    detailsGap: {
      mobile: '1.5rem',
      tablet: '1.75rem',
      laptop: '2rem',
    },
    descriptionSize: {
      mobile: '0.95rem',
      tablet: '1.05rem',
      laptop: '1.125rem',
    },
    descriptionLineHeight: {
      mobile: '1.65',
      tablet: '1.7',
      laptop: '1.75',
    },
    actionsDirection: {
      mobile: 'column',
      tablet: 'row',
      laptop: 'row',
    },
    actionsWidth: {
      mobile: '100%',
      tablet: 'auto',
      laptop: 'auto',
    },
    footerMarginTop: {
      mobile: '2.5rem',
      tablet: '4rem',
      laptop: '5rem',
    },
  },

  statement: {
    paddingTop: {
      mobile: '4.5rem',
      tablet: '6rem',
      laptop: '8rem',
    },
    paddingBottom: {
      mobile: '4.5rem',
      tablet: '6rem',
      laptop: '9rem',
    },
    textSize: {
      mobile: '2.15rem',
      tablet: '3.2rem',
      laptop: '4.5rem',
    },
    lineHeight: {
      mobile: '1.08',
      tablet: '1.06',
      laptop: '1.05',
    },
    maxWidth: {
      mobile: '100%',
      tablet: '56rem',
      laptop: '72rem',
    },
  },

  featuredWork: {
    paddingTop: {
      mobile: '3.5rem',
      tablet: '5rem',
      laptop: '6rem',
    },
    paddingBottom: {
      mobile: '3.5rem',
      tablet: '5rem',
      laptop: '6rem',
    },
    headerGap: {
      mobile: '1.5rem',
      tablet: '2rem',
      laptop: '2rem',
    },
    gridColumns: {
      mobile: '1fr',
      tablet: 'repeat(2, minmax(0, 1fr))',
      laptop: 'repeat(2, minmax(0, 1fr))',
    },
    gridGap: {
      mobile: '1rem',
      tablet: '1.25rem',
      laptop: '1.5rem',
    },
  },

  showreel: {
    paddingTop: {
      mobile: '3.5rem',
      tablet: '5rem',
      laptop: '6rem',
    },
    paddingBottom: {
      mobile: '3.5rem',
      tablet: '5rem',
      laptop: '6rem',
    },
    headerPaddingY: {
      mobile: '1.5rem',
      tablet: '2rem',
      laptop: '2.5rem',
    },
    headerGap: {
      mobile: '1.5rem',
      tablet: '2rem',
      laptop: '2rem',
    },
    playerPadding: {
      mobile: '0.35rem',
      tablet: '0.6rem',
      laptop: '0.75rem',
    },
    playerMaxWidth: {
      mobile: 'min(100%, 390px)',
      tablet: '480px',
      laptop: '520px',
    },
    playerMaxHeight: {
      mobile: '74svh',
      tablet: '76vh',
      laptop: '78vh',
    },
  },

  disciplines: {
    paddingTop: {
      mobile: '4.5rem',
      tablet: '6rem',
      laptop: '7rem',
    },
    paddingBottom: {
      mobile: '4.5rem',
      tablet: '6rem',
      laptop: '7rem',
    },
    gridColumns: {
      mobile: '1fr',
      tablet: '1fr',
      laptop: 'repeat(2, minmax(0, 1fr))',
    },
    gridGap: {
      mobile: '1rem',
      tablet: '1.25rem',
      laptop: '1.5rem',
    },
    cardPadding: {
      mobile: '1.35rem',
      tablet: '2rem',
      laptop: '2.25rem',
    },
    titleSize: {
      mobile: '3.5rem',
      tablet: '4.25rem',
      laptop: '4.75rem',
    },
    listColumns: {
      mobile: '1fr',
      tablet: 'repeat(2, minmax(0, 1fr))',
      laptop: 'repeat(2, minmax(0, 1fr))',
    },
  },

  about: {
    paddingTop: {
      mobile: '4.5rem',
      tablet: '6rem',
      laptop: '7rem',
    },
    paddingBottom: {
      mobile: '4.5rem',
      tablet: '6rem',
      laptop: '7rem',
    },
    gridColumns: {
      mobile: '1fr',
      tablet: '1fr',
      laptop: '0.92fr 1.08fr',
    },
    gridGap: {
      mobile: '2.5rem',
      tablet: '3.5rem',
      laptop: '4rem',
    },
    imageMaxWidth: {
      mobile: '34rem',
      tablet: '38rem',
      laptop: 'none',
    },
    imageAspectRatio: {
      mobile: '4 / 5',
      tablet: '4 / 5',
      laptop: '3 / 4',
    },
    imagePosition: {
      mobile: '50% 25%',
      tablet: '50% 32%',
      laptop: '50% 50%',
    },
    titleSize: {
      mobile: '3rem',
      tablet: '3.75rem',
      laptop: '4.5rem',
    },
    bodySize: {
      mobile: '1rem',
      tablet: '1.125rem',
      laptop: '1.25rem',
    },
    bodyLineHeight: {
      mobile: '1.7',
      tablet: '1.75',
      laptop: '1.8',
    },
    infoColumns: {
      mobile: '1fr',
      tablet: 'repeat(2, minmax(0, 1fr))',
      laptop: 'repeat(2, minmax(0, 1fr))',
    },
  },
} satisfies Record<string, Record<string, ResponsiveValue>>

const createResponsiveRule = (
  selector: string,
  property: string,
  values: ResponsiveValue,
) => `
  ${selector} {
    ${property}: ${values.mobile};
  }

  @media (min-width: 640px) {
    ${selector} {
      ${property}: ${values.tablet};
    }
  }

  @media (min-width: 1024px) {
    ${selector} {
      ${property}: ${values.laptop};
    }
  }
`

const responsiveStyles = `
  ${createResponsiveRule(
    '.home-hero',
    'min-height',
    responsiveControls.hero.minHeight,
  )}

  ${createResponsiveRule(
    '.home-hero-media',
    'object-position',
    responsiveControls.hero.mediaPosition,
  )}

  ${createResponsiveRule('.home-hero-media', '--hero-media-scale', responsiveControls.hero.mediaScale)}

  ${createResponsiveRule(
    '.home-hero-shell',
    'padding-top',
    responsiveControls.hero.contentPaddingTop,
  )}

  ${createResponsiveRule(
    '.home-hero-shell',
    'padding-bottom',
    responsiveControls.hero.contentPaddingBottom,
  )}

  ${createResponsiveRule(
    '.home-hero-content',
    'max-width',
    responsiveControls.hero.contentMaxWidth,
  )}

  ${createResponsiveRule(
    '.home-hero-content',
    'text-align',
    responsiveControls.hero.contentAlignment,
  )}

  ${createResponsiveRule(
    '.home-hero-label',
    'margin-bottom',
    responsiveControls.hero.labelMarginBottom,
  )}

  ${createResponsiveRule(
    '.home-hero-title',
    'font-size',
    responsiveControls.hero.titleSize,
  )}

  ${createResponsiveRule(
    '.home-hero-title',
    'line-height',
    responsiveControls.hero.titleLineHeight,
  )}

  ${createResponsiveRule(
    '.home-hero-title',
    'letter-spacing',
    responsiveControls.hero.titleLetterSpacing,
  )}

  ${createResponsiveRule(
    '.home-hero-details',
    'margin-top',
    responsiveControls.hero.detailsMarginTop,
  )}

  ${createResponsiveRule(
    '.home-hero-details',
    'gap',
    responsiveControls.hero.detailsGap,
  )}

  ${createResponsiveRule(
    '.home-hero-description',
    'font-size',
    responsiveControls.hero.descriptionSize,
  )}

  ${createResponsiveRule(
    '.home-hero-description',
    'line-height',
    responsiveControls.hero.descriptionLineHeight,
  )}

  ${createResponsiveRule(
    '.home-hero-actions',
    'flex-direction',
    responsiveControls.hero.actionsDirection,
  )}

  ${createResponsiveRule(
    '.home-hero-actions',
    'width',
    responsiveControls.hero.actionsWidth,
  )}

  ${createResponsiveRule(
    '.home-hero-footer',
    'margin-top',
    responsiveControls.hero.footerMarginTop,
  )}

  ${createResponsiveRule(
    '.home-statement',
    'padding-top',
    responsiveControls.statement.paddingTop,
  )}

  ${createResponsiveRule(
    '.home-statement',
    'padding-bottom',
    responsiveControls.statement.paddingBottom,
  )}

  ${createResponsiveRule(
    '.home-statement-copy',
    'font-size',
    responsiveControls.statement.textSize,
  )}

  ${createResponsiveRule(
    '.home-statement-copy',
    'line-height',
    responsiveControls.statement.lineHeight,
  )}

  ${createResponsiveRule(
    '.home-statement-copy',
    'max-width',
    responsiveControls.statement.maxWidth,
  )}

  ${createResponsiveRule(
    '.home-featured',
    'padding-top',
    responsiveControls.featuredWork.paddingTop,
  )}

  ${createResponsiveRule(
    '.home-featured',
    'padding-bottom',
    responsiveControls.featuredWork.paddingBottom,
  )}

  ${createResponsiveRule(
    '.home-featured-header',
    'gap',
    responsiveControls.featuredWork.headerGap,
  )}

  ${createResponsiveRule(
    '.home-project-grid',
    'grid-template-columns',
    responsiveControls.featuredWork.gridColumns,
  )}

  ${createResponsiveRule(
    '.home-project-grid',
    'gap',
    responsiveControls.featuredWork.gridGap,
  )}

  ${createResponsiveRule(
    '.home-showreel',
    'padding-top',
    responsiveControls.showreel.paddingTop,
  )}

  ${createResponsiveRule(
    '.home-showreel',
    'padding-bottom',
    responsiveControls.showreel.paddingBottom,
  )}

  ${createResponsiveRule(
    '.home-showreel-header',
    'padding-top',
    responsiveControls.showreel.headerPaddingY,
  )}

  ${createResponsiveRule(
    '.home-showreel-header',
    'padding-bottom',
    responsiveControls.showreel.headerPaddingY,
  )}

  ${createResponsiveRule(
    '.home-showreel-header',
    'gap',
    responsiveControls.showreel.headerGap,
  )}

  ${createResponsiveRule(
    '.home-showreel-player-wrap',
    'padding',
    responsiveControls.showreel.playerPadding,
  )}

  ${createResponsiveRule(
    '.home-showreel-player',
    'max-width',
    responsiveControls.showreel.playerMaxWidth,
  )}

  ${createResponsiveRule(
    '.home-showreel-player',
    'max-height',
    responsiveControls.showreel.playerMaxHeight,
  )}

  ${createResponsiveRule(
    '.home-disciplines',
    'padding-top',
    responsiveControls.disciplines.paddingTop,
  )}

  ${createResponsiveRule(
    '.home-disciplines',
    'padding-bottom',
    responsiveControls.disciplines.paddingBottom,
  )}

  ${createResponsiveRule(
    '.home-discipline-grid',
    'grid-template-columns',
    responsiveControls.disciplines.gridColumns,
  )}

  ${createResponsiveRule(
    '.home-discipline-grid',
    'gap',
    responsiveControls.disciplines.gridGap,
  )}

  ${createResponsiveRule(
    '.home-discipline-card',
    'padding',
    responsiveControls.disciplines.cardPadding,
  )}

  ${createResponsiveRule(
    '.home-discipline-title',
    'font-size',
    responsiveControls.disciplines.titleSize,
  )}

  ${createResponsiveRule(
    '.home-discipline-list',
    'grid-template-columns',
    responsiveControls.disciplines.listColumns,
  )}

  ${createResponsiveRule(
    '.home-about',
    'padding-top',
    responsiveControls.about.paddingTop,
  )}

  ${createResponsiveRule(
    '.home-about',
    'padding-bottom',
    responsiveControls.about.paddingBottom,
  )}

  ${createResponsiveRule(
    '.home-about-grid',
    'grid-template-columns',
    responsiveControls.about.gridColumns,
  )}

  ${createResponsiveRule(
    '.home-about-grid',
    'gap',
    responsiveControls.about.gridGap,
  )}

  ${createResponsiveRule(
    '.home-about-media',
    'max-width',
    responsiveControls.about.imageMaxWidth,
  )}

  ${createResponsiveRule(
    '.home-about-image',
    'aspect-ratio',
    responsiveControls.about.imageAspectRatio,
  )}

  ${createResponsiveRule(
    '.home-about-image',
    'object-position',
    responsiveControls.about.imagePosition,
  )}

  ${createResponsiveRule(
    '.home-about-title',
    'font-size',
    responsiveControls.about.titleSize,
  )}

  ${createResponsiveRule(
    '.home-about-copy',
    'font-size',
    responsiveControls.about.bodySize,
  )}

  ${createResponsiveRule(
    '.home-about-copy',
    'line-height',
    responsiveControls.about.bodyLineHeight,
  )}

  ${createResponsiveRule(
    '.home-about-info',
    'grid-template-columns',
    responsiveControls.about.infoColumns,
  )}

  .home-hero-media {
    transform: scale(var(--hero-media-scale, 1));
    will-change: transform;
  }

  .home-hero-details {
    display: grid;
    grid-template-columns: 1fr;
    align-items: end;
  }

  .home-hero-actions {
    display: flex;
    gap: 0.75rem;
  }

  .home-hero-actions > * {
    width: 100%;
  }

  .home-featured-header,
  .home-showreel-header {
    display: flex;
    flex-direction: column;
  }

  .home-project-grid,
  .home-discipline-grid,
  .home-discipline-list,
  .home-about-grid,
  .home-about-info {
    display: grid;
  }

  .home-showreel-player {
    width: 100%;
    margin-inline: auto;
  }

  .home-about-media {
    width: 100%;
    margin-inline: auto;
  }

  .home-about-image {
    display: block;
    width: 100%;
    height: auto;
  }

  @media (min-width: 640px) {
    .home-featured-header,
    .home-showreel-header {
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
    }

    .home-hero-actions > * {
      width: auto;
    }
  }

  @media (min-width: 768px) {
    .home-hero-details {
      grid-template-columns: minmax(0, 1fr) auto;
    }
  }

  @media (min-width: 1024px) {
    .home-about-grid {
      align-items: center;
    }
  }
`

export function HomePage() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const heroRef = useRef<HTMLElement>(null)

  useHomeHeroAnimation(heroRef)

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
      <style>{responsiveStyles}</style>

      {/* Hero */}
      <section className="home-hero relative flex items-end overflow-hidden bg-black" ref={heroRef}>
        <div className="absolute inset-0">
          {siteConfig.media.heroVideo && !prefersReducedMotion ? (
            <video
              aria-hidden="true"
              autoPlay
              className="home-hero-media h-full w-full object-cover"
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
              className="home-hero-media h-full w-full object-cover"
              fetchPriority="high"
              src={siteConfig.media.heroPoster.src}
            />
          )}

          {/* Clean cinematic overlays — no sparkles or glow effects */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/65 to-black/15" />
          <div className="absolute inset-0 bg-linear-to-t from-(--bg) via-black/15 to-black/35" />
        </div>

        <div className="home-hero-shell section-shell relative z-10 w-full">
          <div className="home-hero-content">
            <div className="home-hero-label flex flex-wrap items-center gap-3">
              <span className="mono-label inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/60">
                <span className="h-px w-5 bg-(--accent)" />
                Available for selected projects
              </span>
            </div>

            <h1 className="home-hero-title display-type text-white">
              <span className="block" data-hero-line>
                I EDIT
              </span>

              <span className="block text-(--accent)" data-hero-line>
                STORIES.
              </span>

              <span className="block text-white/95" data-hero-line>
                I DESIGN IMPACT.
              </span>
            </h1>

            <div className="home-hero-details max-w-5xl border-t border-white/15 pt-6 sm:pt-7">
              <p className="home-hero-description max-w-2xl text-white/70">
                {siteConfig.description}
              </p>

              <div className="home-hero-actions">
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
          </div>

          <div className="home-hero-footer flex items-end justify-between gap-6">
            <div className="hidden items-center gap-3 text-white/50 sm:flex">
              <ArrowDown size={15} />

              <span className="mono-label text-[10px] uppercase tracking-[0.2em]">
                Scroll to explore
              </span>
            </div>

            <div className="mono-label ml-auto text-right text-[10px] uppercase leading-5 tracking-[0.18em] text-white/50">
              Based in Malaysia
              <br />
              Working worldwide
            </div>
          </div>
        </div>
      </section>

      {/* Creative statement */}
      <section className="home-statement section-shell">
        <motion.div
          initial={revealInitial}
          transition={revealTransition}
          viewport={{
            once: true,
            margin: '-100px',
          }}
          whileInView={revealInView}
        >
          <div className="mb-8 flex items-center gap-4 sm:mb-10">
            <span className="mono-label text-[10px] uppercase tracking-[0.22em] text-(--accent)">
              Creative direction
            </span>

            <span className="h-px flex-1 bg-(--line)" />
          </div>

          <p className="home-statement-copy font-medium tracking-[-0.035em] text-(--text)">
            I turn raw footage and simple ideas into{' '}

            <span className="text-(--muted)">
              visual experiences that attract attention,
            </span>{' '}

            communicate emotion, and leave a lasting impression.
          </p>
        </motion.div>
      </section>

      {/* Featured work */}
      <section className="home-featured section-shell">
        <div className="home-featured-header mb-10 border-b border-(--line) pb-7 sm:mb-12 sm:pb-8">
          <SectionHeading
            label="Selected projects"
            number="01"
            title="Stories, campaigns, and motion crafted with intention."
          />

          <div className="shrink-0">
            <Button
              to="/work"
              variant="ghost"
            >
              View All Work
            </Button>
          </div>
        </div>

        {featuredProjects.length > 0 ? (
          <div className="home-project-grid">
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
          <div className="border border-(--line) px-5 py-14 text-center sm:px-6 sm:py-16">
            <p className="text-(--muted)">
              Featured projects will be added soon.
            </p>
          </div>
        )}
      </section>

      {/* Showreel */}
      <section className="home-showreel wide-shell">
        <motion.div
          className="overflow-hidden border border-(--line) bg-(--surface)"
          initial={revealInitial}
          transition={revealTransition}
          viewport={{
            once: true,
            margin: '-100px',
          }}
          whileInView={revealInView}
        >
          <div className="home-showreel-header section-shell border-b border-(--line)">
            <SectionHeading
              copy="A vertical music teaser showing mobile-first pacing, rhythm, sound timing, and concise motion direction."
              label="Selected motion"
              number="02"
              title="Music Teaser"
            />

            <div className="mono-label flex shrink-0 items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-(--muted)">
              <Headphones size={15} />
              Headphones recommended
            </div>
          </div>

          <div className="home-showreel-player-wrap bg-black">
            <VideoPlayer
              className="home-showreel-player"
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
      <section className="home-disciplines section-shell">
        <SectionHeading
          copy="One connected visual approach for projects that need atmosphere, rhythm, clarity, and a recognisable identity."
          label="Creative disciplines"
          number="03"
          title="Motion and design, built to work together."
        />

        <div className="home-discipline-grid mt-10 sm:mt-12">
          {disciplineGroups.map((discipline, index) => (
            <motion.article
              className="home-discipline-card group relative overflow-hidden border border-(--line) bg-(--surface) transition-colors duration-300 hover:border-(--accent)/45"
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
              <div className="flex items-center justify-between border-b border-(--line) pb-5 sm:pb-6">
                <span className="mono-label text-[10px] uppercase tracking-[0.2em] text-(--accent)">
                  {discipline.number}
                </span>

                <ArrowUpRight
                  className="text-(--muted) transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-(--accent)"
                  size={19}
                />
              </div>

              <p className="mono-label mt-7 text-[10px] uppercase tracking-[0.18em] text-(--muted) sm:mt-8">
                {discipline.label}
              </p>

              <h3 className="home-discipline-title display-type mt-3 leading-none text-(--text)">
                {discipline.title}
              </h3>

              <p className="mt-5 max-w-lg text-sm leading-7 text-(--muted) sm:text-base">
                {discipline.copy}
              </p>

              <ul className="home-discipline-list mt-8 gap-x-8 gap-y-4 sm:mt-10">
                {discipline.items.map((item) => (
                  <li
                    className="flex items-center gap-3 text-sm text-(--text) sm:text-base"
                    key={item}
                  >
                    <span className="h-px w-6 shrink-0 bg-(--accent) transition-[width] duration-300 group-hover:w-8" />

                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="home-about section-shell">
        <div className="home-about-grid">
          <motion.div
            className="home-about-media relative"
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
            <div className="relative overflow-hidden rounded-md border border-(--line-strong) bg-(--surface) shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
              <img
                alt={siteConfig.media.aboutWorkspace.alt}
                className="home-about-image object-cover transition-transform duration-700 hover:scale-[1.02]"
                loading="lazy"
                src={siteConfig.media.aboutWorkspace.src}
              />

              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/5 to-transparent" />

              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />

              <div className="absolute bottom-4 left-4 right-4 flex flex-col items-start justify-between gap-4 sm:bottom-6 sm:left-6 sm:right-6 sm:flex-row sm:items-end">
                <div>
                  <p className="mono-label text-[10px] uppercase tracking-[0.2em] text-white/55">
                    Creative based in
                  </p>

                  <p className="mt-2 flex items-center gap-2 text-sm text-white">
                    <MapPin size={15} />
                    Malaysia
                  </p>
                </div>

                <span className="mono-label border border-white/20 bg-black/40 px-3 py-2 text-[9px] uppercase tracking-[0.17em] text-white/75 backdrop-blur-md">
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

            <h2 className="home-about-title display-type mt-5 max-w-3xl leading-[0.98] text-(--text)">
              Creative work shaped by story, motion and design.
            </h2>

            <p className="home-about-copy mt-6 max-w-2xl text-(--muted) sm:mt-8">
              I&apos;m Jack, a video editor and graphic designer focused on
              music videos, event films, promotional content, and expressive
              digital visuals.
            </p>

            <div className="home-about-info mt-7 gap-5 border-y border-(--line) py-6 text-sm sm:mt-8">
              <div>
                <p className="mono-label text-[10px] uppercase tracking-[0.18em] text-(--subtle)">
                  Role
                </p>

                <p className="mt-2 text-(--text)">
                  Video Editor &amp; Graphic Designer
                </p>
              </div>

              <div>
                <p className="mono-label text-[10px] uppercase tracking-[0.18em] text-(--subtle)">
                  Location
                </p>

                <p className="mt-2 text-(--text)">
                  Based in Malaysia
                </p>
              </div>
            </div>

            <SocialLinks
              className="mt-7 sm:mt-8"
              iconSize={19}
              linkClassName="h-[46px] w-[46px]"
              links={aboutSocialLinks}
            />

            <div className="mt-8 sm:mt-10">
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
