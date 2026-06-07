import { BrowserRouter } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { SocialRail } from './components/layout/SocialRail'
import { AppRoutes } from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <SocialRail />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  )
}

export default App
