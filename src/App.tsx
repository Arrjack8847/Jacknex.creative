import { BrowserRouter } from 'react-router-dom'
import { GlobalAnimatedBackground } from './components/common/GlobalAnimatedBackground'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { SocialRail } from './components/layout/SocialRail'
import { useLenisScroll } from './hooks/useLenisScroll'
import { useMagneticInteractions } from './hooks/useMagneticInteractions'
import { AppRoutes } from './routes/AppRoutes'

function App() {
  useLenisScroll()
  useMagneticInteractions()

  return (
    <BrowserRouter>
      <ScrollToTop />

      <GlobalAnimatedBackground />

      <div className="relative z-10 flex min-h-screen flex-col bg-transparent">
        <Navbar />
        <SocialRail />

        <main className="flex-1 bg-transparent">
          <AppRoutes />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App