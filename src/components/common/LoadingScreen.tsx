interface LoadingScreenProps {
  label?: string
}

export function LoadingScreen({ label = 'Loading media' }: LoadingScreenProps) {
  return (
    <div className="absolute inset-0 z-20 grid place-items-center bg-[var(--surface)] text-[var(--muted)]">
      <span className="mono-label text-xs">{label}</span>
    </div>
  )
}
