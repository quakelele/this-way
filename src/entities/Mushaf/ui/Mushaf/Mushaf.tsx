import React, { useEffect, useRef, useState } from 'react'
import screenfull from 'screenfull'
import { useGetMushafPageQuery } from 'entities/Mushaf/api/mushafApi'
import { quranSurahPages } from 'entities/Mushaf/lib/quranSurahPages'
import styles from './Mushaf.module.scss'
import { Divider, Tooltip, Button } from 'antd'
import { useTranslation } from 'shared/hooks/useTranslation'
import { BasmalaSvg } from 'shared/ui/BasmalaSvg/BasmalaSvg'

type Props = {
  chapterId: number
}

export const Mushaf: React.FC<Props> = ({ chapterId }) => {
  const [page, setPage] = useState(quranSurahPages[chapterId] || 1)
  const { data, isLoading, isError } = useGetMushafPageQuery(page)
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    setPage(quranSurahPages[chapterId] || 1)
  }, [chapterId])

  useEffect(() => {
    if (!screenfull.isEnabled) return

    const onChange = () => {
      setIsFullscreen(screenfull.isFullscreen)
    }

    screenfull.on('change', onChange)
    return () => {
      screenfull.off('change', onChange)
    }
  }, [])

  const playAudio = (audioUrl: string | null) => {
    if (audioUrl) {
      const audio = new Audio(`https://audio.qurancdn.com/${audioUrl}`)
      audio.play().catch(error => {
        console.error('Audio playback error:', error)
      })
    }
  }

  const enterFullscreen = () => {
    if (screenfull.isEnabled && containerRef.current) {
      screenfull.request(containerRef.current)
    }
  }

  const exitFullscreen = () => {
    if (screenfull.isEnabled && screenfull.isFullscreen) {
      screenfull.exit()
    }
  }

  const prevPage = () => {
    setPage(p => Math.max(1, p - 1))
  }

  const nextPage = () => {
    setPage(p => Math.min(604, p + 1))
  }

  if (isLoading) return <div className={styles.loading}>جاري التحميل...</div>
  if (isError || !data?.verses)
    return <div className={styles.error}>خطأ في تحميل البيانات</div>

  return (
    <div className={styles.mushafContainer}>
      <div
        className={`${styles.mushaf} ${
          isFullscreen ? styles.fullscreenContainer : ''
        }`}
        ref={containerRef}
        style={{ position: 'relative' }}>
        {isFullscreen && (
          <>
            <div className={styles.controls}>
              <button
                className={styles.controlBtn}
                onClick={prevPage}
                aria-label="Previous Page">
                →
              </button>
              <button
                className={styles.controlBtn}
                onClick={exitFullscreen}
                aria-label="Exit Fullscreen">
                ✕
              </button>
              <button
                className={styles.controlBtn}
                onClick={nextPage}
                aria-label="Next Page">←
              </button>
            </div>

          </>
        )}
        {!isFullscreen && (
          <div className={styles.top}>
            <Button
              type="primary"
              size="small"
              onClick={enterFullscreen}
              style={{
                backgroundColor: 'lightGray',
              }}>
              {t('На весь экран')}
            </Button>
          </div>
        )}

        <div className={styles.pageTitle}>

          صفحة القرآن
          <Tooltip title={data.page_number}>
            <span>{data.page_number.toLocaleString('ar-EG')}</span>
          </Tooltip>
        </div>
        <BasmalaSvg />
        <Divider />

        <div className={styles.arabicText}>
          {data.verses.map((verse, verseIndex) => (
            <span
              key={verseIndex}
              className={styles.verse}>
              {verse.words.map((word, wordIndex) => (
                <span
                  key={`${verseIndex}-${wordIndex}`}
                  className={`${styles.word} ${
                    word.audio_url ? styles.clickable : ''
                  }`}
                  onClick={() => playAudio(word.audio_url)}>
                  {word.text_uthmani}
                </span>
              ))}
              <span className={styles.verseNumber}>{verse.verse_number}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
