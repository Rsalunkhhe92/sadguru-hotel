import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls to the element named in the URL hash (e.g. /#menu), or to the top on page change. */
export function useScrollToHash() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }))
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])
}

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title
  }, [title])
}
