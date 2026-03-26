import { useEffect } from 'react'

/**
 * Listens to window scroll and toggles `data-nav-hidden` on <html>:
 *   - scroll down > 64px  → set attribute  (SiteNav slides up via CSS)
 *   - scroll up           → remove attribute
 *   - back at top (y=0)   → remove attribute
 */
export function useNavScroll() {
  useEffect(() => {
    let lastY = 0
    const onScroll = () => {
      const y = window.scrollY
      if (y === 0) {
        document.documentElement.removeAttribute('data-nav-hidden')
      } else if (y > lastY && y > 64) {
        document.documentElement.setAttribute('data-nav-hidden', '')
      } else if (y < lastY) {
        document.documentElement.removeAttribute('data-nav-hidden')
      }
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.documentElement.removeAttribute('data-nav-hidden')
    }
  }, [])
}
