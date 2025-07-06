import { Spin } from 'antd'
import { useTranslation } from 'shared/hooks/useTranslation'
import { useGetAyaInfiniteQuery } from 'features/QuranReader/api/quranApi'
import { useIntersectionObserver } from 'features/QuranReader/hooks/useIntersectionObserver'
import { AyahCardQuran } from 'entities'
import { Mushaf } from 'entities/Mushaf/ui/Mushaf/Mushaf'
import styles from './ReaderContent.module.scss'
import { UseToggleTypes } from 'shared/hooks/useToggle'

interface ReaderContentProps {
  chapterId: number
  reciter: string
  isVisibleTransliteration: boolean
  quranToggle: UseToggleTypes
  drawerToggler: UseToggleTypes
  language: {
    selectedLanguage: string
    localLanguage: string
    translationLanguage: number
    isTajweedEnabled: boolean
  }
}

export const ReaderContent = ({
  chapterId,
  reciter,
  isVisibleTransliteration,
  quranToggle,
  drawerToggler,
  language,
}: ReaderContentProps) => {
  const { t } = useTranslation()
  const { data, isFetching, isLoading, fetchNextPage, hasNextPage } =
    useGetAyaInfiniteQuery({
      id: chapterId.toString(),
      language,
    })
  const observerRef = useIntersectionObserver({
    isFetching,
    hasNextPage,
    fetchNextPage,
    // quranToggle,
  })

  return (
    <>
      {quranToggle.value ? (
        <Mushaf chapterId={chapterId} />
      ) : (
        <section className={styles.content}>
          {data?.pages.map(page =>
            page.verses.map(ayah => (
              <AyahCardQuran
                drawerToggler={drawerToggler}
                isVisible={isVisibleTransliteration}
                key={ayah.id}
                reciter={reciter}
                {...ayah}
              />
            ))
          )}
          {isLoading && (
            <div className={styles.status}>
              <Spin />
              <p className={styles.loadingText}>{t('Загрузка аятов')}...</p>
            </div>
          )}
          <div
            ref={observerRef}
            style={{ height: 1 }}
          />
          {isFetching && !isLoading && (
            <div className={styles.status}>
              <Spin />
              <p className={styles.loadingText}>{t('Загрузка')}...</p>
            </div>
          )}
          {!hasNextPage && !isLoading && !isFetching && (
            <div className={styles.status}>
              <p className={styles.loadingText}>{t('Все аяты прочитаны')}</p>
            </div>
          )}
        </section>
      )}
    </>
  )
}
