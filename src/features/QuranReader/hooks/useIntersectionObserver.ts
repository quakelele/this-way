import { useEffect, useRef } from 'react'

type Params = {
  isFetching: boolean
  hasNextPage: boolean
  fetchNextPage: () => void
  // quranToggle: boolean
}

export const useIntersectionObserver = ({
  isFetching,
  hasNextPage,
  fetchNextPage,
  // quranToggle
}: Params) => {
      const observerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!observerRef?.current || isFetching || !hasNextPage) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage()
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0,
      }
    )

    observer.observe(observerRef?.current)
    return () => {
      if (observerRef.current) observer.unobserve(observerRef?.current)
    }
  }, [hasNextPage, isFetching, fetchNextPage , ])
  return observerRef
}
