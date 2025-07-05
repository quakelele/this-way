import { Translations } from 'features/QuranReader/model/types'
import styles from './AyahCardQuran.module.scss'
import stylesTajweed from './AyahCardQuranTajweed.module.scss'
import { SurahInfo } from 'entities/Surah/ui/SurahInfo/SurahInfo'
import { useLazyGetTransliterationQuery } from 'features/QuranReader/api/quranApi'
import { AudioPlayer } from 'shared'
import { Collapse, Spin } from 'antd'
import { useRef } from 'react'
import { useTranslation } from 'shared/hooks/useTranslation'

import { RenderTajweed } from '../RenderTajweed/RenderTajweed'
interface Props {
  translations: Translations[]
  text_uthmani: string
  verse_key: string
  reciter: string
  text_uthmani_tajweed?: string
  isVisible: boolean
  showDrawer: () => void
}

export const AyahCardQuran = ({
  translations,
  text_uthmani,
  verse_key,
  text_uthmani_tajweed,
  reciter,
  showDrawer,
  isVisible,
}: Props) => {
  const [lazyTransliterationHandler, { data, isFetching }] =
    useLazyGetTransliterationQuery()
  const { t } = useTranslation()
  const hasFetched = useRef(false)

  const handleCollapseChange = (key: string | string[]) => {
    if (
      (key === '1' || (Array.isArray(key) && key.includes('1'))) &&
      !hasFetched.current
    ) {
      lazyTransliterationHandler(verse_key)
      hasFetched.current = true
    }
  }
  return (
    <section onDoubleClick={showDrawer} className={styles.ayahCard}>
      <header className={styles.ayahHeader}>
        <h3 className={styles.ayahNumber}>{verse_key}</h3>
        <div className={styles.ayahActions}>
          <AudioPlayer
            reciter={reciter}
            surahKeys={verse_key}
          />
        </div>
      </header>

      <div className={styles.card}>
        <div className={stylesTajweed.arabic}>
          {RenderTajweed(text_uthmani_tajweed || text_uthmani)}
        </div>
      </div>

      {isVisible && (
        <>
          <Collapse
            items={[
              {
                key: '1',
                label: t('Транскрипция'),
                children: isFetching ? (
                  <Spin
                    style={{ color: 'gray' }}
                    tip="Loading"
                  />
                ) : (
                  <p className={styles.transliteration}>{data?.data.text}</p>
                ),
              },
            ]}
            onChange={handleCollapseChange}
            bordered={false}
            className={styles.customCollapse}
          />

          <p className={styles.translation}>
            {translations?.map(translation => translation.text)}
          </p>
          <SurahInfo surahNumber={verse_key} />
        </>
      )}
    </section>
  )
}
