import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  to?: string
  href?: string
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
  download?: boolean
  target?: string
  ariaLabel?: string
  icon?: ReactNode
  onPress?: () => void
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-[var(--accent)] bg-[var(--accent)] text-black hover:bg-[var(--accent-strong)] hover:border-[var(--accent-strong)]',
  secondary:
    'border-[var(--line-strong)] bg-black/10 text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent-strong)]',
  ghost:
    'border-transparent bg-transparent text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--line)]',
}

export function Button({
  children,
  variant = 'primary',
  to,
  href,
  type = 'button',
  className,
  disabled,
  download,
  target,
  ariaLabel,
  icon,
  onPress,
}: ButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      <span aria-hidden="true">{icon ?? <ArrowUpRight size={17} strokeWidth={1.8} />}</span>
    </>
  )
  const classes = cn(
    'mono-label inline-flex min-h-12 items-center justify-center gap-3 rounded-[4px] border px-5 py-3 text-xs font-bold transition duration-200',
    'disabled:opacity-55 disabled:hover:border-[var(--line-strong)] disabled:hover:text-[var(--muted)]',
    variantClasses[variant],
    className,
  )

  if (to) {
    return (
      <Link aria-label={ariaLabel} className={classes} onClick={onPress} to={to}>
        {content}
      </Link>
    )
  }

  if (href) {
    const external = target === '_blank' || href.startsWith('http')
    return (
      <a
        aria-label={ariaLabel}
        className={classes}
        download={download}
        href={href}
        onClick={onPress}
        rel={external ? 'noreferrer' : undefined}
        target={target ?? (href.startsWith('http') ? '_blank' : undefined)}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      aria-label={ariaLabel}
      className={classes}
      disabled={disabled}
      onClick={onPress}
      type={type}
    >
      {content}
    </button>
  )
}
