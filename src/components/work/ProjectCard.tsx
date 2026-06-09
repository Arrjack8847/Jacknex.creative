import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, ArrowUpRight, Pause, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../lib/cn'
import {
  MEDIA_LOADER_DELAY_MS,
  MEDIA_LOAD_TIMEOUT_MS,
  type MediaStatus,
  isValidMediaUrl,
  warnMediaFailure,
} from '../../lib/media'
import type { Project, ProjectMediaOrientation } from '../../types/project'
import { MediaPlaceholder } from '../common/MediaPlaceholder'

interface ProjectCardProps {
  project: Project
  activePreviewId?: string | null
  index?: number
  onPreviewRequest?: (projectId: string | null) => void
  variant?: 'standard' | 'wide' | 'tall'
}

const placeholderAspectByOrientation: Record<
  ProjectMediaOrientation,
  'portrait' | 'square' | 'video'
> = {
  landscape: 'video',
  portrait: 'portrait',
  square: 'square',
}

function shouldCoverMedia(project: Project) {
  const ratio = project.cover.width / project.cover.height

  return project.cover.orientation === 'landscape' && ratio <= 1.95
}

export function ProjectCard({
  project,
  activePreviewId,
  index = 0,
  onPreviewRequest,
  variant = 'standard',
}: ProjectCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  const cardRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const loadTimeoutRef = useRef<number | undefined>(undefined)
  const loaderDelayRef = useRef<number | undefined>(undefined)

  const playbackRequestedRef = useRef(false)
  const playAttemptInFlightRef = useRef(false)
  const playbackRequestIdRef = useRef(0)
  const ownsPreviewRequestRef = useRef(false)
  const intentionalUnloadRef = useRef(false)

  const cover = project.cover

  const validPreviewVideo = isValidMediaUrl(project.previewVideo)
    ? project.previewVideo
    : undefined

  const canPreview = Boolean(validPreviewVideo) && !prefersReducedMotion

  const mediaFitClass = shouldCoverMedia(project) ? 'object-cover' : 'object-contain'

  const displayRoles = project.roles.slice(0, 2).join(' / ')
  const videoDuration = project.fullVideo?.duration

  const tone =
    index % 3 === 0 ? 'amber' : index % 3 === 1 ? 'silver' : 'graphite'

  const [status, setStatus] = useState<MediaStatus>('idle')
  const [shouldLoadPreview, setShouldLoadPreview] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [canPlay, setCanPlay] = useState(false)
  const [playRequestVersion, setPlayRequestVersion] = useState(0)

  const clearLoaderDelay = useCallback(() => {
    if (loaderDelayRef.current !== undefined) {
      window.clearTimeout(loaderDelayRef.current)
      loaderDelayRef.current = undefined
    }
  }, [])

  const clearLoadTimeout = useCallback(() => {
    if (loadTimeoutRef.current !== undefined) {
      window.clearTimeout(loadTimeoutRef.current)
      loadTimeoutRef.current = undefined
    }
  }, [])

  const clearTimers = useCallback(() => {
    clearLoaderDelay()
    clearLoadTimeout()
  }, [clearLoaderDelay, clearLoadTimeout])

  const shouldReleaseParentPreview = useCallback(() => {
    return (
      activePreviewId === project.slug ||
      (activePreviewId == null && ownsPreviewRequestRef.current)
    )
  }, [activePreviewId, project.slug])

  const resetPreview = useCallback(
    (nextStatus: MediaStatus = 'idle', resetTime = true) => {
      playbackRequestIdRef.current += 1
      playbackRequestedRef.current = false
      playAttemptInFlightRef.current = false
      ownsPreviewRequestRef.current = false

      clearTimers()
      setShowLoader(false)
      setStatus(nextStatus)

      const video = videoRef.current

      if (!video) return

      video.pause()

      if (resetTime && video.readyState >= HTMLMediaElement.HAVE_METADATA) {
        try {
          video.currentTime = 0
        } catch {
          // Ignore browser-specific seeking errors.
        }
      }
    },
    [clearTimers],
  )

  const markPreviewError = useCallback(() => {
    const shouldClearParent = shouldReleaseParentPreview()

    intentionalUnloadRef.current = true

    playbackRequestIdRef.current += 1
    playbackRequestedRef.current = false
    playAttemptInFlightRef.current = false
    ownsPreviewRequestRef.current = false

    clearTimers()
    setShowLoader(false)
    setCanPlay(false)
    setStatus('error')
    setShouldLoadPreview(false)

    const video = videoRef.current
    video?.pause()

    if (shouldClearParent) {
      onPreviewRequest?.(null)
    }
  }, [clearTimers, onPreviewRequest, shouldReleaseParentPreview])

  const ensureLoaderDelay = useCallback((requestId: number) => {
    if (loaderDelayRef.current !== undefined) return

    loaderDelayRef.current = window.setTimeout(() => {
      loaderDelayRef.current = undefined

      const requestIsStillActive =
        playbackRequestedRef.current && playbackRequestIdRef.current === requestId

      if (!requestIsStillActive) return

      setShowLoader(true)
    }, MEDIA_LOADER_DELAY_MS)
  }, [])

  const ensureLoadTimeout = useCallback(
    (requestId: number) => {
      if (loadTimeoutRef.current !== undefined) return

      loadTimeoutRef.current = window.setTimeout(() => {
        loadTimeoutRef.current = undefined

        const requestIsStillActive =
          playbackRequestedRef.current &&
          playbackRequestIdRef.current === requestId

        if (!requestIsStillActive) return

        warnMediaFailure('Preview failed to become ready before timeout', {
          projectId: project.slug,
          videoUrl: validPreviewVideo,
        })

        markPreviewError()
      }, MEDIA_LOAD_TIMEOUT_MS)
    },
    [markPreviewError, project.slug, validPreviewVideo],
  )

  const startLoadingTimers = useCallback(
    (requestId: number) => {
      clearTimers()
      ensureLoaderDelay(requestId)
      ensureLoadTimeout(requestId)
    },
    [clearTimers, ensureLoaderDelay, ensureLoadTimeout],
  )

  const ensureLoadingTimers = useCallback(
    (requestId: number) => {
      ensureLoaderDelay(requestId)
      ensureLoadTimeout(requestId)
    },
    [ensureLoaderDelay, ensureLoadTimeout],
  )

  const attemptPlayback = useCallback(async () => {
    const video = videoRef.current
    const requestId = playbackRequestIdRef.current

    if (
      !video ||
      !validPreviewVideo ||
      !shouldLoadPreview ||
      !canPlay ||
      !playbackRequestedRef.current ||
      playAttemptInFlightRef.current
    ) {
      return
    }

    if (video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
      return
    }

    playAttemptInFlightRef.current = true

    try {
      await video.play()

      const requestIsStillActive =
        playbackRequestedRef.current && playbackRequestIdRef.current === requestId

      if (!requestIsStillActive) return

      clearTimers()
      setShowLoader(false)
      setStatus('playing')
    } catch (error) {
      const requestWasCancelled =
        !playbackRequestedRef.current || playbackRequestIdRef.current !== requestId

      const isAbortError =
        error instanceof DOMException && error.name === 'AbortError'

      if (isAbortError && requestWasCancelled) return
      if (requestWasCancelled) return

      if (isAbortError) {
        const shouldClearParent = shouldReleaseParentPreview()

        resetPreview('idle', false)

        if (shouldClearParent) {
          onPreviewRequest?.(null)
        }

        return
      }

      warnMediaFailure('Preview playback failed', {
        errorName: error instanceof DOMException ? error.name : undefined,
        mediaErrorCode: video.error?.code,
        projectId: project.slug,
        videoUrl: validPreviewVideo,
      })

      markPreviewError()
    } finally {
      if (playbackRequestIdRef.current === requestId) {
        playAttemptInFlightRef.current = false
      }
    }
  }, [
    canPlay,
    clearTimers,
    markPreviewError,
    onPreviewRequest,
    project.slug,
    resetPreview,
    shouldLoadPreview,
    shouldReleaseParentPreview,
    validPreviewVideo,
  ])

  const requestPreview = useCallback(() => {
    if (!canPreview || !validPreviewVideo || playbackRequestedRef.current) {
      return
    }

    intentionalUnloadRef.current = false

    const requestId = playbackRequestIdRef.current + 1
    playbackRequestIdRef.current = requestId

    playbackRequestedRef.current = true
    playAttemptInFlightRef.current = false
    ownsPreviewRequestRef.current = true

    onPreviewRequest?.(project.slug)

    setShouldLoadPreview(true)
    setShowLoader(false)
    setStatus('loading')
    setPlayRequestVersion((currentVersion) => currentVersion + 1)

    startLoadingTimers(requestId)
  }, [
    canPreview,
    onPreviewRequest,
    project.slug,
    startLoadingTimers,
    validPreviewVideo,
  ])

  const stopPreview = useCallback(
    (nextStatus: MediaStatus = 'idle') => {
      const shouldClearParent = shouldReleaseParentPreview()

      resetPreview(nextStatus)

      if (shouldClearParent) {
        onPreviewRequest?.(null)
      }
    },
    [onPreviewRequest, resetPreview, shouldReleaseParentPreview],
  )

  useEffect(() => {
    const card = cardRef.current

    if (!card || !canPreview) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.65) {
          requestPreview()
          return
        }

        stopPreview('idle')
      },
      {
        threshold: [0, 0.35, 0.65, 1],
        rootMargin: '0px 0px -8% 0px',
      },
    )

    observer.observe(card)

    return () => observer.disconnect()
  }, [canPreview, requestPreview, stopPreview])

  useEffect(() => {
    if (!canPlay || !shouldLoadPreview || !playbackRequestedRef.current) return

    void attemptPlayback()
  }, [attemptPlayback, canPlay, playRequestVersion, shouldLoadPreview])

  useEffect(() => {
    if (
      activePreviewId != null &&
      activePreviewId !== project.slug &&
      (playbackRequestedRef.current || ownsPreviewRequestRef.current)
    ) {
      resetPreview('idle')
    }
  }, [activePreviewId, project.slug, resetPreview])

  useEffect(() => {
    intentionalUnloadRef.current = true

    playbackRequestIdRef.current += 1
    playbackRequestedRef.current = false
    playAttemptInFlightRef.current = false
    ownsPreviewRequestRef.current = false

    clearTimers()

    const resetFrame = window.requestAnimationFrame(() => {
      setShowLoader(false)
      setCanPlay(false)
      setShouldLoadPreview(false)
      setStatus(validPreviewVideo ? 'idle' : 'error')
    })

    const video = videoRef.current
    video?.pause()

    return () => {
      window.cancelAnimationFrame(resetFrame)
    }
  }, [clearTimers, validPreviewVideo])

  useEffect(() => {
    if (
      canPreview ||
      (!playbackRequestedRef.current && !ownsPreviewRequestRef.current)
    ) {
      return
    }

    const shouldClearParent = shouldReleaseParentPreview()

    resetPreview(validPreviewVideo ? 'idle' : 'error')

    if (shouldClearParent) {
      onPreviewRequest?.(null)
    }
  }, [
    canPreview,
    onPreviewRequest,
    resetPreview,
    shouldReleaseParentPreview,
    validPreviewVideo,
  ])

  useEffect(() => {
    const video = videoRef.current

    return () => {
      intentionalUnloadRef.current = true

      playbackRequestIdRef.current += 1
      playbackRequestedRef.current = false
      playAttemptInFlightRef.current = false
      ownsPreviewRequestRef.current = false

      clearTimers()
      video?.pause()
    }
  }, [clearTimers])

  const previewIsVisible = status === 'playing'
  const shouldShowUnavailable = status === 'error' && Boolean(validPreviewVideo)
  const previewIsRequested =
    status === 'loading' || status === 'ready' || status === 'playing'

  return (
    <motion.article
      ref={cardRef}
      className={cn(
        'group/project',
        variant === 'wide' && cover.orientation !== 'portrait' && 'md:col-span-2',
      )}
      data-reveal="project-card"
      exit={
        prefersReducedMotion
          ? undefined
          : {
              opacity: 0,
              y: 12,
            }
      }
      initial={false}
      layout
    >
      <div
        className="project-card-media relative aspect-video overflow-hidden rounded-md border border-(--line) bg-black shadow-[0_18px_52px_rgba(0,0,0,0.36)] transition-colors duration-300 group-hover/project:border-(--line-strong)"
        data-media-orientation={cover.orientation}
        onPointerMove={(event) => {
          if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return

          const target = event.currentTarget
          const rect = target.getBoundingClientRect()
          const x = ((event.clientX - rect.left) / rect.width) * 100
          const y = ((event.clientY - rect.top) / rect.height) * 100

          target.style.setProperty('--card-glow-x', `${x}%`)
          target.style.setProperty('--card-glow-y', `${y}%`)
        }}
      >
        {cover.src ? (
          <img
            alt={cover.alt}
            className={cn(
              'absolute inset-0 h-full w-full transition duration-500 group-hover/project:scale-[1.02]',
              mediaFitClass,
              previewIsVisible ? 'opacity-0' : 'opacity-100',
            )}
            decoding="async"
            loading="lazy"
            src={cover.src}
          />
        ) : (
          <MediaPlaceholder
            aspect={placeholderAspectByOrientation[cover.orientation]}
            className="absolute inset-0 h-full w-full border-0"
            title={project.title}
            tone={tone}
          />
        )}

        {canPreview ? (
          <video
            aria-label={`${project.title} preview`}
            className={cn(
              'absolute inset-0 h-full w-full transition-opacity duration-500',
              mediaFitClass,
              previewIsVisible ? 'opacity-100' : 'opacity-0',
            )}
            loop
            muted
            playsInline
            poster={cover.src}
            preload="none"
            ref={videoRef}
            src={shouldLoadPreview ? validPreviewVideo : undefined}
            onAbort={() => {
              if (intentionalUnloadRef.current || !playbackRequestedRef.current) {
                clearTimers()
                setShowLoader(false)
              }
            }}
            onCanPlay={() => {
              setCanPlay(true)

              if (!playbackRequestedRef.current) return

              clearLoaderDelay()
              setShowLoader(false)
              setStatus('ready')
            }}
            onError={() => {
              if (intentionalUnloadRef.current || !shouldLoadPreview) return

              warnMediaFailure('Preview failed to load', {
                mediaErrorCode: videoRef.current?.error?.code,
                projectId: project.slug,
                videoUrl: validPreviewVideo,
              })

              markPreviewError()
            }}
            onLoadedMetadata={() => {
              if (!playbackRequestedRef.current) return

              setStatus((currentStatus) =>
                currentStatus === 'idle' ? 'loading' : currentStatus,
              )
            }}
            onLoadStart={() => {
              setCanPlay(false)

              if (!playbackRequestedRef.current) return

              intentionalUnloadRef.current = false
              setStatus('loading')

              ensureLoadingTimers(playbackRequestIdRef.current)
            }}
            onPause={() => {
              if (!playbackRequestedRef.current) return

              const shouldClearParent = shouldReleaseParentPreview()

              playbackRequestIdRef.current += 1
              playbackRequestedRef.current = false
              playAttemptInFlightRef.current = false
              ownsPreviewRequestRef.current = false

              clearTimers()
              setShowLoader(false)
              setStatus('paused')

              if (shouldClearParent) {
                onPreviewRequest?.(null)
              }
            }}
            onPlaying={() => {
              if (!playbackRequestedRef.current) return

              clearTimers()
              setShowLoader(false)
              setStatus('playing')
            }}
            onStalled={() => {
              if (!playbackRequestedRef.current) return

              setStatus('loading')
              ensureLoadingTimers(playbackRequestIdRef.current)
            }}
            onSuspend={() => {
              if (canPlay) {
                clearLoaderDelay()
                setShowLoader(false)
              }
            }}
            onWaiting={() => {
              if (!playbackRequestedRef.current) return

              setStatus('loading')
              ensureLoadingTimers(playbackRequestIdRef.current)
            }}
          />
        ) : null}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 bg-linear-to-t from-black/35 to-transparent"
        />

        <div
          aria-hidden="true"
          className="project-card-hover-panel pointer-events-none absolute inset-x-0 bottom-0 z-30 hidden p-4 md:block"
        >
          <p className="mono-label text-[10px] font-bold text-(--accent)">
            {project.projectType}
          </p>

          <p className="mt-1 max-w-[85%] text-lg font-semibold leading-tight text-white">
            {project.title}
          </p>
        </div>

        {project.fullVideo && !shouldShowUnavailable ? (
          <div className="pointer-events-none absolute left-4 top-4 z-30 flex max-w-[calc(100%-2rem)] flex-wrap items-center gap-2">
            <span className="mono-label inline-flex min-h-9 items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 text-[10px] text-white/80 backdrop-blur">
              <Play fill="currentColor" size={12} />
              Final video
            </span>

            {videoDuration ? (
              <span className="mono-label inline-flex min-h-9 items-center rounded-full border border-white/15 bg-black/55 px-3 text-[10px] text-white/65 backdrop-blur">
                {videoDuration}
              </span>
            ) : null}
          </div>
        ) : null}

        <Link
          aria-label={`View ${project.title}`}
          className="absolute inset-0 z-10 rounded-md focus-visible:outline-offset-[-6px]"
          to={`/work/${project.slug}`}
        />

        {canPreview ? (
          <button
            aria-label={
              previewIsRequested
                ? `Pause ${project.title} preview`
                : `Play ${project.title} preview`
            }
            className="absolute bottom-4 right-4 z-30 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur transition hover:border-(--accent) hover:text-(--accent) focus-visible:outline-offset-2"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()

              if (previewIsRequested) {
                stopPreview('paused')
                return
              }

              requestPreview()
            }}
            type="button"
          >
            {previewIsRequested ? (
              <Pause size={18} />
            ) : (
              <Play fill="currentColor" size={17} />
            )}
          </button>
        ) : null}

        {showLoader && status === 'loading' ? (
          <div className="pointer-events-none absolute bottom-4 left-4 z-30 rounded-full border border-white/15 bg-black/55 px-3 py-2 text-white/75 backdrop-blur">
            <span className="mono-label text-[10px]">Loading preview</span>
          </div>
        ) : null}

        {shouldShowUnavailable ? (
          <div className="absolute left-4 top-4 z-30 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-2 text-white/70 backdrop-blur">
            <AlertTriangle size={13} />

            <span className="mono-label text-[10px]">Preview unavailable</span>
          </div>
        ) : null}
      </div>

      <Link
        aria-label={`View ${project.title}`}
        className="group/details mt-4 block rounded-md focus-visible:outline-2 focus-visible:outline-(--accent-strong) focus-visible:outline-offset-4 sm:mt-5"
        to={`/work/${project.slug}`}
      >
        <p className="mono-label text-xs font-bold text-(--accent) sm:text-[0.8125rem]">
          {project.projectType}
        </p>

        <h3 className="project-card-title mt-2 text-[1.85rem] font-semibold leading-[1.03] text-(--text) sm:text-[2rem] lg:text-[2.15rem]">
          {project.title}
        </h3>

        <p className="mt-2.5 text-[0.95rem] leading-6 text-(--muted) sm:text-base">
          {displayRoles}
        </p>

        <div className="mt-4 flex min-h-11 items-center justify-between gap-4 text-(--muted) sm:mt-5">
          <span className="mono-label text-xs">{project.year}</span>

          <span
            aria-hidden="true"
            className="grid h-11 w-11 place-items-center text-(--accent) transition duration-300 group-hover/details:-translate-y-0.5 group-hover/details:translate-x-0.5 group-hover/details:text-(--accent-strong)"
          >
            <ArrowUpRight size={22} strokeWidth={1.8} />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}