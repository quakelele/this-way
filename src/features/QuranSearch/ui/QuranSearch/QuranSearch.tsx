import { useState, useEffect, useRef } from 'react'
import styles from './QuranSearch.module.scss'
import { QuranSearchForm } from '../QuranSearchForm/QuranSearchForm'
import { SearchFormTypes } from 'shared/model/types'
import { useGetAyaInfiniteQuery } from 'features/QuranSearch/api/searchApi'
import { AyahCard } from 'entities/AyahCard/ui/AyahCard/AyahCard'
import { AyahCardSkeleton } from 'shared/ui/Skeletons/AyahCardSkeleton/AyahCardSkeleton'
import { NavigationButtons } from 'features/NavigationButtons/NavigationButtons'
import { useTranslation } from 'shared/hooks/useTranslation'
import { Button } from 'antd'

export const QuranSearch = () => {
  const [query, setQuery] = useState<SearchFormTypes>()
  const { t } = useTranslation()
  const { data, isFetching, fetchNextPage, hasNextPage } =
    useGetAyaInfiniteQuery(query as SearchFormTypes, {
      skip: !query,
    })

  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const allResults = data?.pages.flatMap(page => page.search.results) ?? []
  const totalResults = data?.pages[0]?.search?.total_results
  const searchText = data?.pages[0]?.search?.query || ''

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    if (!hasNextPage || isFetching) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage()
        }
      },
      {
        rootMargin: '300px',
        threshold: 0.5,
      }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    observerRef.current = observer

    return () => observer.disconnect()
  }, [hasNextPage, isFetching, fetchNextPage])

  const renderResults = () => {
    if (isFetching && !allResults.length) {
      return <AyahCardSkeleton />
    }

    if (!allResults.length && !isFetching) {
      return (
        <div className={styles.emptyState}>
          <h3 className={styles.emptyTitle}>{t('Начните поиск')}</h3>
          <p className={styles.emptyText}>
            {t('Введите слово или фразу для поиска в Коране')}
          </p>
        </div>
      )
    }

    return (
      <>
        {allResults.map(quran => (
          <AyahCard
            key={quran.verse_id}
            {...quran}
          />
        ))}
        {hasNextPage && (
          <div
            ref={loadMoreRef}
            className={styles.loadMoreTrigger}
          />
        )}
      </>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1>{t('Поиск в Коране')}</h1>
          <p>{t('Найдите аяты и получите духовное руководство')}</p>
        </header>

        <QuranSearchForm
          setQuery={setQuery}
          isLoading={isFetching}
        />
        {/* <NavigationButtons search={searchText} /> */}

        {data && (
          <section className={styles.results}>
            <h2 className={styles.resultsTitle}>
              {t('Результаты поиска')}: ({totalResults})
            </h2>
            {renderResults()}
          </section>
        )}
      </div>
      {/* <Button
        className={styles.submitButton}
        onClick={scrollToTop}>
        {' '}
        scroll up
      </Button> */}
    </div>
  )
}
