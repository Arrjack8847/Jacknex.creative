import { cn } from '../../lib/cn'

type MediaTone = 'amber' | 'silver' | 'graphite'

interface MediaPlaceholderProps {
  title: string
  label?: string
  aspect?: 'video' | 'portrait' | 'square' | 'standard' | 'wide'
  tone?: MediaTone
  className?: string
}

const aspectClasses = {
  video: 'aspect-video',
  portrait: 'aspect-[9/16]',
  square: 'aspect-square',
  standard: 'aspect-[4/3]',
  wide: 'aspect-[16/7]',
}

const toneClasses: Record<MediaTone, string> = {
  amber: 'from-[#2a1b0e] via-[#11100e] to-black',
  silver: 'from-[#252521] via-[#11100e] to-black',
  graphite: 'from-[#191817] via-[#0f0e0c] to-black',
}

export function MediaPlaceholder({
  title,
  label = 'Replace with final media',
  aspect = 'video',
  tone = 'amber',
  className,
}: MediaPlaceholderProps) {
  return (
    <div
      aria-label={`${title} media placeholder`}
      className={cn(
        'relative overflow-hidden rounded-[6px] border border-[var(--line)] bg-gradient-to-br',
        aspectClasses[aspect],
        toneClasses[tone],
        className,
      )}
      role="img"
    >
      <div className="absolute inset-0 opacity-45">
        <div className="absolute left-6 top-6 h-16 w-24 border border-white/20" />
        <div className="absolute bottom-8 right-8 h-24 w-40 border border-[var(--accent)]/40" />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10" />
        <div className="absolute bottom-0 left-0 right-0 grid grid-cols-8 gap-1 p-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <span
              className="h-8 rounded-[2px] bg-white/10"
              key={`placeholder-frame-${title}-${index}`}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-5">
        <p className="mono-label text-[10px] font-bold text-[var(--accent)]">{label}</p>
        <p className="mt-2 max-w-[18rem] text-lg font-semibold text-[var(--text)]">{title}</p>
      </div>
      <div className="grain" />
    </div>
  )
}
