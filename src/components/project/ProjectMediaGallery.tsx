import { useMemo, useRef, useState } from 'react'
import { Expand, ImageIcon, Play } from 'lucide-react'
import { cn } from '../../lib/cn'
import type { ProjectMedia } from '../../types/project'
import { MediaLightbox } from './MediaLightbox'

interface ProjectMediaGalleryProps {
  media: ProjectMedia[]
}

/**
 * Controls each gallery item's responsive width.
 *
 * Mobile:
 * - Every item uses the full width.
 *
 * Tablet:
 * - Normal and portrait items use one column.
 * - Wide landscape items use both columns.
 *
 * Desktop:
 * - Portrait and standard items use 4 of 12 columns.
 * - Wide landscape items use 8 of 12 columns.
 */
function getMediaGridSpan(media: ProjectMedia) {
  const ratio =
    media.height > 0 ? media.width / media.height : 1

  if (
    media.orientation === 'landscape' &&
    ratio >= 1.7
  ) {
    return 'sm:col-span-2 lg:col-span-8'
  }

  return 'sm:col-span-1 lg:col-span-4'
}

function getPreviewSource(media: ProjectMedia) {
  if (media.type === 'video') {
    return media.poster
  }

  return media.src
}

function getMediaTypeLabel(media: ProjectMedia) {
  return media.type === 'video' ? 'Video' : 'Image'
}

function getOrientationLabel(media: ProjectMedia) {
  switch (media.orientation) {
    case 'portrait':
      return 'Portrait'
    case 'landscape':
      return 'Landscape'
    default:
      return 'Square'
  }
}

export function ProjectMediaGallery({
  media,
}: ProjectMediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<
    number | null
  >(null)

  const lastTriggerRef =
    useRef<HTMLButtonElement | null>(null)

  const orderedMedia = useMemo(() => {
    return [...media].sort(
      (first, second) => first.order - second.order,
    )
  }, [media])

  if (orderedMedia.length === 0) {
    return null
  }

  const handleOpen = (
    index: number,
    trigger: HTMLButtonElement,
  ) => {
    lastTriggerRef.current = trigger
    setActiveIndex(index)
  }

  const handleClose = () => {
    setActiveIndex(null)

    window.requestAnimationFrame(() => {
      lastTriggerRef.current?.focus()
    })
  }

  return (
    <>
      <div
        aria-label="Project media gallery"
        className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12 lg:gap-6"
      >
        {orderedMedia.map((item, index) => {
          const previewSource =
            getPreviewSource(item)

          const mediaTitle =
            item.title?.trim() || item.alt

          const mediaType =
            getMediaTypeLabel(item)

          const orientation =
            getOrientationLabel(item)

          return (
            <button
              aria-haspopup="dialog"
              aria-label={`Open ${mediaTitle} in media viewer`}
              className={cn(
                'group relative isolate min-h-0 w-full cursor-pointer overflow-hidden rounded-[6px] border border-[var(--line)] bg-black/35 text-left',
                'transition-[border-color,box-shadow,transform] duration-300 ease-out',
                'hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[0_18px_55px_rgba(0,0,0,0.22)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--background)]',
                'active:translate-y-0 active:scale-[0.995]',
                'motion-reduce:transform-none motion-reduce:transition-none',
                getMediaGridSpan(item),
              )}
              data-media-orientation={
                item.orientation
              }
              key={item.id}
              onClick={(event) =>
                handleOpen(
                  index,
                  event.currentTarget,
                )
              }
              style={{
                aspectRatio: `${item.width} / ${item.height}`,
              }}
              type="button"
            >
              {/* Subtle background preview */}
              {previewSource ? (
                <img
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full scale-110 object-cover opacity-20 blur-2xl transition duration-700 group-hover:scale-125 motion-reduce:transition-none"
                  decoding="async"
                  loading="lazy"
                  src={previewSource}
                />
              ) : null}

              {/* Main preview */}
              <div className="absolute inset-0 z-[1] flex items-center justify-center overflow-hidden">
                {previewSource ? (
                  <img
                    alt={
                      item.type === 'image'
                        ? item.alt
                        : ''
                    }
                    aria-hidden={
                      item.type === 'video'
                        ? true
                        : undefined
                    }
                    className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
                    decoding="async"
                    loading="lazy"
                    src={previewSource}
                  />
                ) : item.type === 'video' ? (
                  <video
                    aria-label={item.alt}
                    className="h-full w-full object-contain"
                    muted
                    playsInline
                    preload="metadata"
                    src={item.src}
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-[var(--muted)]">
                    <ImageIcon
                      aria-hidden="true"
                      size={28}
                    />

                    <span className="mono-label text-[10px]">
                      Preview unavailable
                    </span>
                  </div>
                )}
              </div>

              {/* Hover shade */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[2] bg-black/0 transition-colors duration-300 group-hover:bg-black/10 motion-reduce:transition-none"
              />

              {/* Top controls */}
              <span className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-3 sm:p-4">
                {item.type === 'video' ? (
                  <span className="grid size-10 place-items-center rounded-full border border-white/20 bg-black/55 text-white shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-105 sm:size-11 motion-reduce:transition-none">
                    <Play
                      aria-hidden="true"
                      fill="currentColor"
                      size={17}
                    />
                  </span>
                ) : (
                  <span />
                )}

                <span className="grid size-9 translate-y-1 place-items-center rounded-full border border-white/15 bg-black/45 text-white opacity-0 backdrop-blur-md transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none">
                  <Expand
                    aria-hidden="true"
                    size={15}
                  />
                </span>
              </span>

              {/* Bottom information */}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-4 pb-4 pt-16 sm:px-5 sm:pb-5 sm:pt-20">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="mono-label text-[9px] font-bold tracking-[0.12em] text-[var(--accent)] sm:text-[10px]">
                    {mediaType}
                  </span>

                  <span
                    aria-hidden="true"
                    className="size-1 rounded-full bg-white/40"
                  />

                  <span className="mono-label text-[9px] tracking-[0.1em] text-white/65 sm:text-[10px]">
                    {orientation}
                  </span>
                </span>

                <span className="mt-1.5 block line-clamp-2 text-sm font-semibold leading-snug text-white sm:text-base">
                  {mediaTitle}
                </span>

                <span className="mt-2 block max-h-0 overflow-hidden text-xs text-white/65 opacity-0 transition-[max-height,opacity] duration-300 group-hover:max-h-6 group-hover:opacity-100 group-focus-visible:max-h-6 group-focus-visible:opacity-100 motion-reduce:transition-none">
                  Open full preview
                </span>
              </span>
            </button>
          )
        })}
      </div>

      {activeIndex !== null ? (
        <MediaLightbox
          activeIndex={activeIndex}
          media={orderedMedia}
          onClose={handleClose}
          onNavigate={setActiveIndex}
        />
      ) : null}
    </>
  )
}