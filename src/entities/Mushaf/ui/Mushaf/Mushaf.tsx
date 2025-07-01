import { useEffect,  useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import styles from './Mushaf.module.scss'
import { quranSurahPages } from 'entities/Mushaf/lib/quranSurahPages'
import { useGetMushafPageQuery } from 'entities/Mushaf/api/mushafApi'
import { useTranslation } from 'shared/hooks/useTranslation'
import { useAutoAnimate } from '@formkit/auto-animate/react'

type Props = {
  chapterId: number
}

export const Mushaf = ({ chapterId }: Props) => {
  const [page, setPage] = useState(quranSurahPages[chapterId])
  const [direction, setDirection] = useState<1 | -1>(1)

  const { t } = useTranslation()
  const { data,  } = useGetMushafPageQuery(page)


  useEffect(() => {
    setPage(quranSurahPages[chapterId])
  }, [chapterId])

  const surahId = data?.data?.ayahs?.[0]?.surah?.number
  const isBasmalahRequired = surahId !== 1 && surahId !== 9
  const ayahs = data?.data?.ayahs ?? []

  const displayAyahs = isBasmalahRequired
    ? ayahs.filter(
        (a, i) => i !== 0 || a.text !== 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'
      )
    : ayahs

  const handleChangePage = (newPage: number, dir: 1 | -1) => {
    if (newPage < 1 || newPage > 604) return
    setDirection(dir)
    setPage(newPage)
  }

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => handleChangePage(page + 1, 1),
    onSwipedLeft: () => handleChangePage(page - 1, -1),
    trackMouse: true,
    delta: 10,
  })

  return (
    <div
      className={styles.wrapper}
      {...swipeHandlers}
      >
      <div className={styles.nav}>
        <button
          disabled={page <= 1}
          onClick={() => handleChangePage(page - 1, -1)}>
          →
        </button>
        <span>
          {t('Страница')} {page}
        </span>
        <button  onClick={() => setPage(prev => prev + 1)}>←</button>
      </div>

      <div className={styles.page}>
        {isBasmalahRequired && <div className={styles.basmala}>﷽</div>}
        <div className={styles.text}>
          {displayAyahs.map(ayah => (
            <span
           
              key={ayah.number}
              className={styles.ayah}>
              {ayah.text}
              <span className={styles.ayahNumber}>{ayah.numberInSurah}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
