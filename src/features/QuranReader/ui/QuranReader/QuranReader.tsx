import { useState, useEffect, useRef } from 'react'
import styles from './QuranReader.module.scss'
import { AyahCardQuran } from 'entities'
import { Spin, Select } from 'antd'
import { surahOptions } from 'features/QuranReader/constants/surahs'
import { useGetAyaInfiniteQuery } from 'features/QuranReader/api/quranApi'

export const QuranReader = () => {
  const [chapterId, setChapterId] = useState(1)

  const { data, isFetching, isLoading, fetchNextPage, hasNextPage } = useGetAyaInfiniteQuery(chapterId, {
    refetchOnMountOrArgChange: true,
  })

  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!observerRef.current || isFetching || !hasNextPage) return

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

    observer.observe(observerRef.current)

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current)
    }
  }, [hasNextPage, isFetching, fetchNextPage])

  const handleChapterChange = (value: number) => {
    setChapterId(value)
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Чтение Корана</h1>
      </header>

      <section className={styles.controls}>
        <div className={styles.selectWrapper}>
          
          <Select
            className={styles.select}
            value={chapterId}
            onChange={handleChapterChange}
            showSearch
            optionFilterProp="label"
            filterOption={(input, option) =>
              (option?.label as string).toLowerCase().includes(input.toLowerCase())
            }
            options={surahOptions.map(option => ({
              value: option.value,
              label: `Сура ${option.value}: ${option.label.russian} (${option.label.arabic})`,
            }))}
            popupMatchSelectWidth={false}
          />
        </div>
      </section>

      <section className={styles.content}>
        {data?.pages.map((page, i) => (
          <div key={i}>
            {page.verses.map(ayah => (
              <AyahCardQuran key={ayah.id} ayah={ayah} />
            ))}
          </div>
        ))}

        {isLoading && (
          <div className={styles.status}>
            <Spin />
            <p className={styles.loadingText}>Загрузка аятов...</p>
          </div>
        )}

        <div ref={observerRef} style={{ height: 1 }} />

        {isFetching && !isLoading && (
          <div className={styles.status}>
            <Spin />
            <p className={styles.loadingText}>Загрузка...</p>
          </div>
        )}

        {!hasNextPage && !isLoading && !isFetching && (
          <div className={styles.status}>
            <p className={styles.loadingText}>Все аяты прочитаны</p>
          </div>
        )}
      </section>
    </main>
  )
}