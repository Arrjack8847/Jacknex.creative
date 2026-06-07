import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { SectionLabel } from './SectionLabel'

interface SectionHeadingProps {
  label?: string
  number?: string
  title: ReactNode
  copy?: ReactNode
  className?: string
}

export function SectionHeading({ label, number, title, copy, className }: SectionHeadingProps) {
  return (
    <div className={cn('space-y-5', className)}>
      {label ? <SectionLabel label={label} number={number} /> : null}
      <div className="max-w-4xl space-y-5">
        <h2 className="display-type text-5xl text-[var(--text)] sm:text-6xl lg:text-7xl">{title}</h2>
        {copy ? <p className="max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">{copy}</p> : null}
      </div>
    </div>
  )
}
