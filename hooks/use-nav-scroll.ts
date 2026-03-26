import { useEffect, type RefObject } from 'react'

/**
 * Attaches a scroll listener to `ref` and toggles `data-nav-hidden` on <html>:
 *   - scroll down > 60px  → set attribute  (SiteNav collapses via CSS)
 *   - scroll up           → remove attribute
 *   - back at top         → remove attribute
 * Cleans up on unmount.
 */
export function useNavScroll(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let lastY = 0
    const onScroll = () => {
      const y = el.scrollTop
      if (y === 0) {
        document.documentElement.removeAttribute('data-nav-hidden')
      } else if (y > lastY && y > 60) {
        document.documentElement.setAttribute('data-nav-hidden', '')
      } else if (y < lastY) {
        document.documentElement.removeAttribute('data-nav-hidden')
      }
      lastY = y
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      document.documentElement.removeAttribute('data-nav-hidden')
    }
  }, [ref])
}
