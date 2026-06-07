import { cn } from '../../lib/cn'

interface SectionLabelProps {
  number?: string
  label: string
  className?: string
}

export function SectionLabel({ number, label, className }: SectionLabelProps) {
  return (
    <p className={cn('mono-label flex items-center gap-3 text-xs font-bold text-[var(--accent)]', className)}>
      {number ? <span className="text-[var(--subtle)]">{number}</span> : null}
      <span>{label}</span>
    </p>
  )
}
