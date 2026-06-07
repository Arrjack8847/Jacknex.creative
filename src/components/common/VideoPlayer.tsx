import { useRef, useState } from 'react'
import { Maximize2, Play } from 'lucide-react'
import { cn } from '../../lib/cn'
import type { ProjectMediaOrientation } from '../../types/project'
import { LoadingScreen } from './LoadingScreen'

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

export function VideoPlayer({
  title,
  poster,
  videoSrc,
  duration,
  label = 'Showreel',
  width = 16,
  height = 9,
  orientation = 'landscape',
  className,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(!videoSrc)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = async () => {
    if (!videoSrc || !videoRef.current) {
      return
    }

    await videoRef.current.play()
    setIsPlaying(true)

    if (frameRef.current?.requestFullscreen) {
      await frameRef.current.requestFullscreen().catch(() => undefined)
    }
  }

  return (
    <div
      className={cn('media-frame media-frame--contain', className)}
      data-media-orientation={orientation}
      ref={frameRef}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {/* Production media note: use compressed poster images, short WebM previews when available, MP4 H.264 fallback, and load full-quality videos only after user interaction. */}
      {videoSrc ? (
        <video
          aria-label={title}
          className="h-full w-full object-contain"
          controls={isPlaying}
          onCanPlay={() => setIsReady(true)}
          onEnded={() => setIsPlaying(false)}
          playsInline
          poster={poster}
          preload="metadata"
          ref={videoRef}
          src={videoSrc}
        />
      ) : (
        <img
          alt={`${title} poster`}
          className="h-full w-full object-contain"
          loading="lazy"
          src={poster}
        />
      )}
      {!isReady ? <LoadingScreen /> : null}
      {!isPlaying ? (
        <>
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <button
              aria-label={videoSrc ? `Play ${title}` : `${title} video source pending`}
              className="group grid h-20 w-20 place-items-center rounded-full border border-[var(--accent)] bg-black/45 text-[var(--text)] backdrop-blur transition hover:bg-[var(--accent)] hover:text-black disabled:opacity-70"
              disabled={!videoSrc}
              onClick={handlePlay}
              type="button"
            >
              {videoSrc ? <Play fill="currentColor" size={28} /> : <Maximize2 size={26} />}
            </button>
          </div>
          <div className="absolute bottom-0 left-0 z-10 max-w-md p-5 sm:p-8">
            <p className="mono-label text-xs font-bold text-[var(--accent)]">{label}</p>
            <h3 className="display-type mt-3 text-4xl text-[var(--text)] sm:text-5xl">{title}</h3>
            <div className="mt-5 flex flex-wrap gap-4 text-xs text-[var(--muted)]">
              {duration ? <span className="mono-label">{duration} duration</span> : null}
              <span className="mono-label">Headphones recommended</span>
              {!videoSrc ? <span className="mono-label text-[var(--accent)]">Final video pending</span> : null}
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
