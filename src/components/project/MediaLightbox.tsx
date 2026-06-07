import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { ProjectMedia } from '../../types/project'

interface MediaLightboxProps {
  media: ProjectMedia[]
  activeIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

function getMediaSource(media: ProjectMedia) {
  return media.type === 'video' ? media.poster : media.src
}

export function MediaLightbox({ media, activeIndex, onClose, onNavigate }: MediaLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const activeMedia = media[activeIndex]
  const hasMultipleItems = media.length > 1
  const backgroundSource = getMediaSource(activeMedia)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key === 'ArrowLeft' && hasMultipleItems) {
        onNavigate((activeIndex - 1 + media.length) % media.length)
        return
      }

      if (event.key === 'ArrowRight' && hasMultipleItems) {
        onNavigate((activeIndex + 1) % media.length)
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return
      }

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, video[controls], [href], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute('disabled'))

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (!firstElement || !lastElement) {
        return
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, hasMultipleItems, media.length, onClose, onNavigate])

  return (
    <div
      aria-label={`${activeMedia.title ?? activeMedia.alt} fullscreen viewer`}
      aria-modal="true"
      className="fixed inset-0 z-50 flex min-h-dvh flex-col bg-black/95 text-white"
      ref={dialogRef}
      role="dialog"
    >
      {backgroundSource ? (
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-20 blur-2xl"
          src={backgroundSource}
        />
      ) : null}

      <div className="relative z-10 flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div>
          <p className="mono-label text-[10px] text-[var(--accent)]">
            {activeIndex + 1} / {media.length}
          </p>
          <p className="mt-1 max-w-[70vw] truncate text-sm text-white/75">
            {activeMedia.title ?? activeMedia.alt}
          </p>
        </div>

        <button
          aria-label="Close media viewer"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-[4px] border border-white/20 bg-black/40 text-white backdrop-blur transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          <X size={20} />
        </button>
      </div>

      <div className="relative z-10 grid flex-1 place-items-center px-4 pb-6 sm:px-8 sm:pb-8">
        {hasMultipleItems ? (
          <button
            aria-label="Show previous media"
            className="absolute left-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur transition hover:border-[var(--accent)] hover:text-[var(--accent)] sm:left-5"
            onClick={() => onNavigate((activeIndex - 1 + media.length) % media.length)}
            type="button"
          >
            <ChevronLeft size={22} />
          </button>
        ) : null}

        <figure className="grid max-h-[calc(100dvh-8rem)] w-full place-items-center gap-4">
          {activeMedia.type === 'image' ? (
            <img
              alt={activeMedia.alt}
              className="h-auto max-h-[calc(100dvh-10rem)] w-auto max-w-[calc(100vw-2rem)] rounded-[6px] object-contain shadow-[0_28px_120px_rgba(0,0,0,0.75)] sm:max-w-[calc(100vw-8rem)]"
              decoding="async"
              src={activeMedia.src}
            />
          ) : (
            <video
              aria-label={activeMedia.alt}
              className="h-auto max-h-[calc(100dvh-10rem)] w-auto max-w-[calc(100vw-2rem)] rounded-[6px] bg-black object-contain shadow-[0_28px_120px_rgba(0,0,0,0.75)] sm:max-w-[calc(100vw-8rem)]"
              controls
              playsInline
              poster={activeMedia.poster}
              preload="metadata"
              src={activeMedia.src}
            />
          )}

          {activeMedia.caption ? (
            <figcaption className="max-w-2xl text-center text-sm leading-6 text-white/70">
              {activeMedia.caption}
            </figcaption>
          ) : null}
        </figure>

        {hasMultipleItems ? (
          <button
            aria-label="Show next media"
            className="absolute right-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur transition hover:border-[var(--accent)] hover:text-[var(--accent)] sm:right-5"
            onClick={() => onNavigate((activeIndex + 1) % media.length)}
            type="button"
          >
            <ChevronRight size={22} />
          </button>
        ) : null}
      </div>
    </div>
  )
}
