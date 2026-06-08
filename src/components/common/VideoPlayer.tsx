import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  AlertTriangle,
  Play,
  RotateCcw,
} from 'lucide-react'
import { cn } from '../../lib/cn'
import {
  isValidMediaUrl,
  MEDIA_LOADER_DELAY_MS,
  MEDIA_LOAD_TIMEOUT_MS,
  type MediaStatus,
  warnMediaFailure,
} from '../../lib/media'
import type { ProjectMediaOrientation } from '../../types/project'

interface VideoPlayerProps {
  title: string
  poster: string
  videoSrc?: string
  duration?: string
  label?: string
  width?: number
  height?: number
  orientation?: ProjectMediaOrientation
  className?: string
}

function getSafeDimension(
  value: number | undefined,
  fallback: number,
) {
  if (
    typeof value !== 'number' ||
    !Number.isFinite(value) ||
    value <= 0
  ) {
    return fallback
  }

  return value
}

export function VideoPlayer({
  title,
  poster,
  videoSrc,
  duration,
  label = 'Showreel',
  width,
  height,
  orientation = 'landscape',
  className,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const loadTimeoutRef = useRef<
    number | undefined
  >(undefined)

  const loaderDelayRef = useRef<
    number | undefined
  >(undefined)

  const playbackRequestedRef = useRef(false)
  const playAttemptInFlightRef = useRef(false)
  const playbackRequestIdRef = useRef(0)

  const validVideoSrc = isValidMediaUrl(videoSrc)
    ? videoSrc
    : undefined

  /*
   * When dimensions are not supplied, automatically
   * use an appropriate ratio for the orientation.
   */
  const defaultWidth =
    orientation === 'portrait' ? 9 : 16

  const defaultHeight =
    orientation === 'portrait' ? 16 : 9

  const aspectWidth = getSafeDimension(
    width,
    defaultWidth,
  )

  const aspectHeight = getSafeDimension(
    height,
    defaultHeight,
  )

  const [status, setStatus] =
    useState<MediaStatus>(
      validVideoSrc ? 'idle' : 'error',
    )

  const [showLoader, setShowLoader] =
    useState(false)

  const [
    hasStartedPlayback,
    setHasStartedPlayback,
  ] = useState(false)

  const clearLoaderDelay = useCallback(() => {
    if (loaderDelayRef.current === undefined) {
      return
    }

    window.clearTimeout(loaderDelayRef.current)
    loaderDelayRef.current = undefined
  }, [])

  const clearLoadTimeout = useCallback(() => {
    if (loadTimeoutRef.current === undefined) {
      return
    }

    window.clearTimeout(loadTimeoutRef.current)
    loadTimeoutRef.current = undefined
  }, [])

  const clearTimers = useCallback(() => {
    clearLoaderDelay()
    clearLoadTimeout()
  }, [clearLoaderDelay, clearLoadTimeout])

  const ensureLoaderDelay = useCallback(
    (requestId: number) => {
      if (
        loaderDelayRef.current !== undefined
      ) {
        return
      }

      loaderDelayRef.current =
        window.setTimeout(() => {
          loaderDelayRef.current = undefined

          const requestIsStillActive =
            playbackRequestedRef.current &&
            playbackRequestIdRef.current ===
              requestId

          if (!requestIsStillActive) {
            return
          }

          setShowLoader(true)
        }, MEDIA_LOADER_DELAY_MS)
    },
    [],
  )

  const ensureLoadTimeout = useCallback(
    (requestId: number) => {
      if (
        loadTimeoutRef.current !== undefined
      ) {
        return
      }

      loadTimeoutRef.current =
        window.setTimeout(() => {
          loadTimeoutRef.current = undefined

          const requestIsStillActive =
            playbackRequestedRef.current &&
            playbackRequestIdRef.current ===
              requestId

          if (!requestIsStillActive) {
            return
          }

          warnMediaFailure(
            'Video failed to begin playback before timeout',
            {
              videoUrl: validVideoSrc,
            },
          )

          playbackRequestIdRef.current += 1
          playbackRequestedRef.current = false
          playAttemptInFlightRef.current = false

          setShowLoader(false)
          setHasStartedPlayback(false)
          setStatus('error')

          videoRef.current?.pause()
        }, MEDIA_LOAD_TIMEOUT_MS)
    },
    [validVideoSrc],
  )

  const startLoadingTimers = useCallback(
    (requestId: number) => {
      clearTimers()
      ensureLoaderDelay(requestId)
      ensureLoadTimeout(requestId)
    },
    [
      clearTimers,
      ensureLoaderDelay,
      ensureLoadTimeout,
    ],
  )

  const ensureLoadingTimers = useCallback(
    (requestId: number) => {
      ensureLoaderDelay(requestId)
      ensureLoadTimeout(requestId)
    },
    [
      ensureLoaderDelay,
      ensureLoadTimeout,
    ],
  )

  const stopPlayback = useCallback(
    (
      nextStatus: MediaStatus = validVideoSrc
        ? 'idle'
        : 'error',
      resetTime = true,
    ) => {
      playbackRequestIdRef.current += 1
      playbackRequestedRef.current = false
      playAttemptInFlightRef.current = false

      clearTimers()
      setShowLoader(false)
      setStatus(nextStatus)

      if (
        nextStatus === 'idle' ||
        nextStatus === 'error'
      ) {
        setHasStartedPlayback(false)
      }

      const video = videoRef.current

      if (!video) {
        return
      }

      video.pause()

      if (
        resetTime &&
        video.readyState >=
          HTMLMediaElement.HAVE_METADATA
      ) {
        try {
          video.currentTime = 0
        } catch {
          // Some browsers can reject seeking
          // while media state is changing.
        }
      }
    },
    [clearTimers, validVideoSrc],
  )

  /*
   * The only programmatic video.play() call.
   * It is triggered directly by user interaction.
   */
  const handlePlayRequest =
    useCallback(async () => {
      const video = videoRef.current

      if (!video || !validVideoSrc) {
        return
      }

      if (
        playbackRequestedRef.current ||
        playAttemptInFlightRef.current
      ) {
        return
      }

      const requestId =
        playbackRequestIdRef.current + 1

      playbackRequestIdRef.current =
        requestId

      playbackRequestedRef.current = true
      playAttemptInFlightRef.current = true

      setShowLoader(false)
      setStatus('loading')

      startLoadingTimers(requestId)

      try {
        await video.play()

        const requestIsStillActive =
          playbackRequestedRef.current &&
          playbackRequestIdRef.current ===
            requestId

        if (!requestIsStillActive) {
          return
        }

        clearTimers()
        setShowLoader(false)
        setHasStartedPlayback(true)
        setStatus('playing')
      } catch (error) {
        const requestWasCancelled =
          !playbackRequestedRef.current ||
          playbackRequestIdRef.current !==
            requestId

        const isAbortError =
          error instanceof DOMException &&
          error.name === 'AbortError'

        if (
          isAbortError &&
          requestWasCancelled
        ) {
          return
        }

        if (requestWasCancelled) {
          return
        }

        warnMediaFailure(
          'Video playback failed',
          {
            errorName:
              error instanceof DOMException
                ? error.name
                : undefined,
            mediaErrorCode:
              video.error?.code,
            videoUrl: validVideoSrc,
          },
        )

        clearTimers()
        playbackRequestedRef.current = false
        setShowLoader(false)
        setHasStartedPlayback(false)

        if (video.error) {
          setStatus('error')
          return
        }

        setStatus('idle')
      } finally {
        if (
          playbackRequestIdRef.current ===
          requestId
        ) {
          playAttemptInFlightRef.current =
            false
        }
      }
    }, [
      clearTimers,
      startLoadingTimers,
      validVideoSrc,
    ])

  /*
   * Reset the player when the source changes.
   */
  useEffect(() => {
    playbackRequestIdRef.current += 1
    playbackRequestedRef.current = false
    playAttemptInFlightRef.current = false

    clearTimers()
    setShowLoader(false)
    setHasStartedPlayback(false)

    setStatus(
      validVideoSrc ? 'idle' : 'error',
    )

    const video = videoRef.current

    if (!video) {
      return
    }

    video.pause()

    if (
      video.readyState >=
      HTMLMediaElement.HAVE_METADATA
    ) {
      try {
        video.currentTime = 0
      } catch {
        // Ignore source-change seeking errors.
      }
    }
  }, [clearTimers, validVideoSrc])

  /*
   * Clean up active playback and timers when the
   * component is removed.
   */
  useEffect(() => {
    const video = videoRef.current

    return () => {
      playbackRequestIdRef.current += 1
      playbackRequestedRef.current = false
      playAttemptInFlightRef.current = false

      clearTimers()
      video?.pause()
    }
  }, [clearTimers])

  const hasPlayableVideo =
    Boolean(validVideoSrc)

  const isVideoVisible =
    hasStartedPlayback ||
    status === 'paused'

  const showPlayOverlay =
    status === 'idle' ||
    status === 'error'

  const isPlaybackError =
    status === 'error' && hasPlayableVideo

  const screenReaderStatus = (() => {
    switch (status) {
      case 'loading':
        return `${title} is loading`
      case 'playing':
        return `${title} is playing`
      case 'paused':
        return `${title} is paused`
      case 'error':
        return hasPlayableVideo
          ? `${title} could not be played`
          : `${title} does not have a video source`
      default:
        return `${title} is ready to play`
    }
  })()

  return (
    <div
      aria-busy={status === 'loading'}
      className={cn(
        'media-frame media-frame--contain',
        'relative isolate w-full overflow-hidden bg-black',
        className,
      )}
      data-media-orientation={orientation}
      style={{
        aspectRatio: `${aspectWidth} / ${aspectHeight}`,
      }}
    >
      <span
        aria-live="polite"
        className="sr-only"
      >
        {screenReaderStatus}
      </span>

      <img
        alt={`${title} poster`}
        className={cn(
          'pointer-events-none absolute inset-0 h-full w-full',
          'select-none object-contain',
          'transition-opacity duration-500',
          'motion-reduce:transition-none',
          isVideoVisible
            ? 'opacity-0'
            : 'opacity-100',
        )}
        decoding="async"
        draggable={false}
        loading="lazy"
        src={poster}
      />

      <video
        aria-label={title}
        className={cn(
          'relative z-[2] h-full w-full bg-black',
          'object-contain',
          'transition-opacity duration-500',
          'motion-reduce:transition-none',
          isVideoVisible
            ? 'opacity-100'
            : 'pointer-events-none opacity-0',
        )}
        controls={isVideoVisible}
        onAbort={() => {
          if (!playbackRequestedRef.current) {
            clearTimers()
            setShowLoader(false)
          }
        }}
        onCanPlay={() => {
          if (!playbackRequestedRef.current) {
            return
          }

          clearLoaderDelay()
          setShowLoader(false)
        }}
        onEnded={() => {
          stopPlayback('idle', true)
        }}
        onError={() => {
          const video = videoRef.current

          warnMediaFailure(
            'Video failed to load',
            {
              mediaErrorCode:
                video?.error?.code,
              videoUrl: validVideoSrc,
            },
          )

          playbackRequestIdRef.current += 1
          playbackRequestedRef.current = false
          playAttemptInFlightRef.current = false

          clearTimers()
          setShowLoader(false)
          setHasStartedPlayback(false)
          setStatus('error')
        }}
        onPause={() => {
          const video = videoRef.current

          if (
            video?.ended ||
            !playbackRequestedRef.current
          ) {
            return
          }

          playbackRequestIdRef.current += 1
          playbackRequestedRef.current = false
          playAttemptInFlightRef.current = false

          clearTimers()
          setShowLoader(false)
          setStatus('paused')
        }}
        onPlay={() => {
          if (!playbackRequestedRef.current) {
            playbackRequestIdRef.current += 1
            playbackRequestedRef.current = true

            startLoadingTimers(
              playbackRequestIdRef.current,
            )
          }

          setStatus('loading')
        }}
        onPlaying={() => {
          playbackRequestedRef.current = true

          clearTimers()
          setShowLoader(false)
          setHasStartedPlayback(true)
          setStatus('playing')
        }}
        onStalled={() => {
          if (!playbackRequestedRef.current) {
            return
          }

          setStatus('loading')

          ensureLoadingTimers(
            playbackRequestIdRef.current,
          )
        }}
        onWaiting={() => {
          if (!playbackRequestedRef.current) {
            return
          }

          setStatus('loading')

          ensureLoadingTimers(
            playbackRequestIdRef.current,
          )
        }}
        playsInline
        poster={poster}
        preload="metadata"
        ref={videoRef}
        src={validVideoSrc}
      />

      {showPlayOverlay ? (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[5] bg-black/10"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[6] bg-gradient-to-t from-black/90 via-black/20 to-black/20"
          />

          <div className="absolute inset-x-0 top-[38%] z-10 flex -translate-y-1/2 items-center justify-center sm:top-1/2">
            <button
              aria-label={
                isPlaybackError
                  ? `Retry ${title}`
                  : hasPlayableVideo
                    ? `Play ${title}`
                    : `${title} video source unavailable`
              }
              className={cn(
                'group grid touch-manipulation place-items-center',
                'h-14 w-14 rounded-full sm:h-16 sm:w-16 lg:h-20 lg:w-20',
                'border border-(--accent)',
                'bg-black/55 text-(--text) backdrop-blur-md',
                'transition duration-300',
                'hover:scale-105 hover:bg-(--accent) hover:text-black',
                'active:scale-95',
                'focus-visible:outline-none',
                'focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
                'focus-visible:ring-offset-2 focus-visible:ring-offset-black',
                'disabled:cursor-not-allowed disabled:opacity-60',
                'motion-reduce:transform-none motion-reduce:transition-none',
              )}
              disabled={!hasPlayableVideo}
              onClick={() => {
                void handlePlayRequest()
              }}
              type="button"
            >
              {isPlaybackError ? (
                <RotateCcw
                  aria-hidden="true"
                  size={22}
                  strokeWidth={1.8}
                />
              ) : hasPlayableVideo ? (
                <Play
                  aria-hidden="true"
                  className="translate-x-[1px]"
                  fill="currentColor"
                  size={24}
                />
              ) : (
                <AlertTriangle
                  aria-hidden="true"
                  size={22}
                  strokeWidth={1.8}
                />
              )}
            </button>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 sm:p-6 lg:p-8">
            <div className="max-w-2xl">
              <p className="mono-label text-[9px] font-bold tracking-[0.16em] text-(--accent) sm:text-xs">
                {isPlaybackError
                  ? 'Playback error'
                  : label}
              </p>

              <h3 className="display-type mt-1.5 max-w-full text-[clamp(1.35rem,6vw,3.5rem)] leading-[0.95] text-(--text) sm:mt-3">
                {title}
              </h3>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[9px] text-(--muted) sm:mt-4 sm:text-xs">
                {duration ? (
                  <span className="mono-label">
                    {duration} duration
                  </span>
                ) : null}

                <span className="mono-label hidden sm:inline">
                  Headphones recommended
                </span>

                {!hasPlayableVideo ? (
                  <span className="mono-label text-(--accent)">
                    Video pending
                  </span>
                ) : null}

                {isPlaybackError ? (
                  <span className="mono-label text-(--accent)">
                    Tap the button to retry
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </>
      ) : null}

      {showLoader &&
      status === 'loading' ? (
        <div
          aria-live="polite"
          className="absolute inset-0 z-20 grid place-items-center bg-black/25 px-4 text-(--text) backdrop-blur-[1px]"
          role="status"
        >
          <span className="mono-label rounded-full border border-white/15 bg-black/65 px-4 py-2 text-center text-[9px] tracking-[0.16em] shadow-lg sm:text-[10px]">
            Loading video
          </span>
        </div>
      ) : null}

      {isPlaybackError ? (
        <div
          className={cn(
            'pointer-events-none absolute left-3 top-3 z-20',
            'inline-flex max-w-[calc(100%-1.5rem)] items-center gap-2',
            'rounded-full border border-white/15',
            'bg-black/65 px-3 py-2',
            'text-[9px] text-white/75 backdrop-blur-md',
            'sm:left-4 sm:top-4 sm:text-[10px]',
          )}
        >
          <AlertTriangle
            aria-hidden="true"
            className="shrink-0"
            size={13}
          />

          <span className="mono-label truncate">
            Playback failed
          </span>
        </div>
      ) : null}
    </div>
  )
}