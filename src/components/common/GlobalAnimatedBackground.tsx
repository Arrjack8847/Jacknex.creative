import { useLocation } from 'react-router-dom'

type BackgroundMood = 'home' | 'work' | 'about' | 'contact' | 'services'

function getBackgroundMood(pathname: string): BackgroundMood {
  if (pathname === '/') return 'home'
  if (pathname.startsWith('/work')) return 'work'
  if (pathname.startsWith('/about')) return 'about'
  if (pathname.startsWith('/contact') || pathname.startsWith('/thank-you')) {
    return 'contact'
  }
  return 'services'
}

const particles = Array.from({ length: 28 }, (_, index) => index)

export function GlobalAnimatedBackground() {
  const { pathname } = useLocation()
  const mood = getBackgroundMood(pathname)

  return (
    <div aria-hidden="true" className="studio-bg" data-mood={mood}>
      <div className="studio-bg__base" />

      <div className="studio-bg__beams">
        <span className="studio-bg__beam studio-bg__beam--blue" />
        <span className="studio-bg__beam studio-bg__beam--gold" />
        <span className="studio-bg__beam studio-bg__beam--soft" />
      </div>

      <div className="studio-bg__glows">
        <span className="studio-bg__glow studio-bg__glow--blue" />
        <span className="studio-bg__glow studio-bg__glow--gold" />
        <span className="studio-bg__glow studio-bg__glow--violet" />
      </div>

      <div className="studio-bg__particles">
        {particles.map((particle) => (
          <span
            key={particle}
            className="studio-bg__particle"
            style={
              {
                '--particle-left': `${(particle * 13) % 100}%`,
                '--particle-size': `${2 + (particle % 5)}px`,
                '--particle-duration': `${14 + (particle % 8) * 3}s`,
                '--particle-delay': `${(particle % 9) * -2}s`,
                '--particle-opacity': `${0.18 + (particle % 5) * 0.08}`,
                '--particle-drift-x': `${-80 + (particle % 7) * 28}px`,
                '--particle-drift-y': `${-220 - (particle % 6) * 70}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="studio-bg__vignette" />
      <div className="studio-bg__grain" />
    </div>
  )
}