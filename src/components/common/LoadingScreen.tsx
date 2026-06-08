interface LoadingScreenProps {
  label?: string
}

export function LoadingScreen({ label = 'Loading preview' }: LoadingScreenProps) {
  return (
    <div className="absolute inset-0 z-20 grid place-items-center bg-black/20 text-[var(--text)] backdrop-blur-[1px]">
      <span className="mono-label rounded-full border border-white/15 bg-black/45 px-4 py-2 text-[10px] tracking-[0.16em]">
        {label}
      </span>
    </div>
  )
}
