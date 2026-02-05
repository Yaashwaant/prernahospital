import { useState, useEffect, useRef } from 'react'

/**
 * Custom hook to detect scroll direction
 * Returns 'up' or 'down' based on user scroll behavior
 */
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const lastScrollY = useRef(0)

  useEffect(() => {
    let ticking = false

    const updateScrollDirection = () => {
      const scrollY = window.scrollY

      if (Math.abs(scrollY - lastScrollY.current) < 5) {
        ticking = false
        return
      }

      setScrollDirection(scrollY > lastScrollY.current ? 'down' : 'up')
      lastScrollY.current = scrollY
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return scrollDirection
}
