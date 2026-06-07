import type { ReactElement } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { PageTransition } from '../components/layout/PageTransition'
import { AboutPage } from '../pages/AboutPage'
import { ContactPage } from '../pages/ContactPage'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProjectDetailPage } from '../pages/ProjectDetailPage'
import { ServicesPage } from '../pages/ServicesPage'
import { ThankYouPage } from '../pages/ThankYouPage'
import { WorkPage } from '../pages/WorkPage'

function withTransition(page: ReactElement) {
  return <PageTransition>{page}</PageTransition>
}

export function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route element={withTransition(<HomePage />)} path="/" />
        <Route element={withTransition(<WorkPage />)} path="/work" />
        <Route element={withTransition(<ProjectDetailPage />)} path="/work/:slug" />
        <Route element={withTransition(<ServicesPage />)} path="/services" />
        <Route element={withTransition(<AboutPage />)} path="/about" />
        <Route element={withTransition(<ContactPage />)} path="/contact" />
        <Route element={withTransition(<ThankYouPage />)} path="/thank-you" />
        <Route element={withTransition(<NotFoundPage />)} path="*" />
      </Routes>
    </AnimatePresence>
  )
}
