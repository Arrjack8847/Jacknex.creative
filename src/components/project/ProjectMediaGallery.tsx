import { useMemo, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { cn } from '../../lib/cn'
import type { ProjectMedia } from '../../types/project'
import { MediaLightbox } from './MediaLightbox'

interface ProjectMediaGalleryProps {
  media: ProjectMedia[]
}

function getMediaSpan(media: ProjectMedia) {
  const ratio = media.width / media.height

  if (media.orientation === 'portrait') {
    return 'sm:row-span-2'
  }

  if (media.orientation === 'landscape' && ratio >= 1.7) {
    return 'sm:col-span-2'
  }

  return undefined
}

function getPreviewSource(media: ProjectMedia) {
  return media.type === 'video' ? media.poster : media.src
}

export function ProjectMediaGallery({
  media,
}: ProjectMediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)

  const orderedMedia = useMemo(
    () =>
      [...media].sort(
        (first, second) => first.order - second.order,
      ),
    [media],
  )

  if (orderedMedia.length === 0) {
    return null
  }

  const handleClose = () => {
    setActiveIndex(null)

    window.requestAnimationFrame(() => {
      lastTriggerRef.current?.focus()
    })
  }

  return (
    <>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {orderedMedia.map((item, index) => {
          const previewSource = getPreviewSource(item)

          return (
            <button
              aria-label={`Open ${item.title ?? item.alt}`}
              className={cn(
                'media-frame media-frame--contain group min-h-0 w-full cursor-pointer bg-black/35 text-left transition hover:border-(--accent) focus-visible:outline-offset-8',
                getMediaSpan(item),
              )}
              data-media-orientation={item.orientation}
              key={item.id}
              onClick={(event) => {
                lastTriggerRef.current = event.currentTarget
                setActiveIndex(index)
              }}
              style={{
                aspectRatio: `${item.width} / ${item.height}`,
              }}
              type="button"
            >
              {previewSource ? (
                <img
                  alt={item.type === 'image' ? item.alt : ''}
                  aria-hidden={
                    item.type === 'video' ? true : undefined
                  }
                  className="relative z-2 h-full w-full object-contain transition duration-500 group-hover:scale-[1.015]"
                  decoding="async"
                  loading="lazy"
                  src={previewSource}
                />
              ) : (
                <video
                  aria-label={item.alt}
                  className="relative z-2 h-full w-full object-contain"
                  muted
                  playsInline
                  preload="metadata"
                  src={item.src}
                />
              )}

              {item.type === 'video' ? (
                <span className="absolute left-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur">
                  <Play fill="currentColor" size={18} />
                </span>
              ) : null}

              <span className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-black/80 via-black/30 to-transparent p-4">
                <span className="mono-label block text-[10px] text-(--accent)">
                  {item.type === 'video' ? 'Video' : 'Image'} /{' '}
                  {item.orientation}
                </span>

                <span className="mt-1 block text-sm font-semibold text-(--text)">
                  {item.title ?? item.alt}
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