import { useState, useEffect, useRef } from 'react'
import styles from './QuranReader.module.scss'
import { AyahCardQuran } from 'entities'
import { Spin, Select } from 'antd'
import { surahOptions } from 'features/QuranReader/constants/surahs'
import { useGetAyaInfiniteQuery } from 'features/QuranReader/api/quranApi'
import { reciters } from 'features/QuranReader/constants/reciters'
import { useTranslation } from 'shared/hooks/useTranslation'
import { options } from 'features/QuranSearch/utils/options'
import { useNavigate, useParams } from 'react-router'
import { NavigateButton } from 'shared/ui/NavigateButton/NavigateButton'
import { surahs } from 'entities/AyahCard/model/surahs'

export const QuranReader = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const [chapterId, setChapterId] = useState(1)
  const [reciter, setReciter] = useState('ar.alafasy')
  const [language, setLanguage] = useState(
    JSON.parse(localStorage.getItem('language')).translationLanguage
  )

  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false)
      } else {
        setIsHeaderVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])


  const navigate = useNavigate()

  const { data, isFetching, isLoading, fetchNextPage, hasNextPage } =
    useGetAyaInfiniteQuery({ id, language })

  const observerRef = useRef<HTMLDivElement | null>(null)
  console.log(language)
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
    navigate(`/${id}`)
  }
  const handleLanguageChange = (value: number) => {
    setLanguage(value)
  }

  console.log(data)
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>
          {t('Сура')}: {`${t(surahs[id].russian)}`} <p> {surahs[id].arabic}</p>
        </h1>
        
      </header>

      <section className={`${styles.controls} ${
          isHeaderVisible ? styles.visible : styles.hidden
        }`}>
        <div className={styles.selectWrapper}>
          <NavigateButton type="left" />
          <Select
            className={styles.select}
            value={chapterId}
            onChange={handleChapterChange}
            showSearch
            optionFilterProp="label"
            filterOption={(input, option) =>
              (option?.label as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={surahOptions.map(option => ({
              value: option.value,
              label: `${t('Сура')} ${option.value}: ${t(
                option.label.russian
              )} (${option.label.arabic})`,
            }))}
            popupMatchSelectWidth={false}
          />
          <Select
            className={styles.select}
            value={reciter}
            onChange={setReciter}
            options={reciters.map(option => ({
              value: option.value,
              label: `${t(option.label)}`,
            }))}
            placeholder="Чтец"
          />
        </div>
      </section>

      <section className={styles.content}>
        {data?.pages.map(page =>
          page.verses.map(ayah => (
            <AyahCardQuran
              reciter={reciter}
              key={ayah.id}
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
    </main>
  )
}
