import { useEffect, useRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useScrollReveal } from '../../hooks/useScrollReveal'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const location = useLocation()
  const pageRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const shouldReducePageMotion =
    prefersReducedMotion ||
    (typeof document !== 'undefined' && document.hidden)

  useScrollReveal(pageRef, location.pathname)

  useEffect(() => {
    if (shouldReducePageMotion) {
      return undefined
    }

    const showFinalState = () => {
      if (pageRef.current) {
        pageRef.current.style.filter = 'blur(0px)'
        pageRef.current.style.opacity = '1'
        pageRef.current.style.transform = 'translateY(0px)'
      }

      if (overlayRef.current) {
        overlayRef.current.style.transform = 'scaleY(0)'
      }
    }

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        return
      }

      showFinalState()
    }

    if (document.hidden) {
      showFinalState()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [location.pathname, shouldReducePageMotion])

  return (
    <>
      {!shouldReducePageMotion ? (
        <motion.div
          aria-hidden="true"
          animate={{ scaleY: 0 }}
          className="pointer-events-none fixed inset-0 z-[80] origin-top bg-[#050504]"
          exit={{ scaleY: 1 }}
          initial={{ scaleY: 1 }}
          ref={overlayRef}
          transition={{ duration: 0.38, ease: [0.83, 0, 0.17, 1] }}
        />
      ) : null}

      <motion.div
        animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
        exit={
          shouldReducePageMotion
            ? { opacity: 0 }
            : { filter: 'blur(6px)', opacity: 0, y: -10 }
        }
        initial={
          shouldReducePageMotion
            ? false
            : { filter: 'blur(4px)', opacity: 0, y: 12 }
        }
        ref={pageRef}
        transition={{
          duration: shouldReducePageMotion ? 0 : 0.34,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </>
  )
}
