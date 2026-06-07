import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
