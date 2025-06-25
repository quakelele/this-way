import { Ayah } from 'features/QuranReader/model/types'
import styles from './AyahCardQuran.module.scss'
import { SurahInfo } from 'entities/Surah/ui/SurahInfo/SurahInfo'
import FavoriteButton from 'features/Favorites/ui/FavoriteButton/FavoriteButton'
import AudioPlayer from 'features/AudioPlayer/ui/AudioPlayer/AudioPlayer'
import { useGetTransliterationQuery } from 'features/QuranReader/api/quranApi'

interface Props {
  ayah: Ayah
}

export const AyahCardQuran: React.FC<Props> = ({ ayah }) => {
  const { data } = useGetTransliterationQuery(ayah.verse_key)
  return (
    <div className={styles.ayahCard}>
      <div className={styles.ayahHeader}>
        <div className={styles.ayahNumber}>{ayah.verse_key}</div>
        <div className={styles.ayahActions}>
          <AudioPlayer ayah={ayah} />
        </div>
      </div>
      <div className={styles.arabicText}>{ayah.text_uthmani}</div>
      <div className={styles.transliteration}>{data?.data?.text}</div>
      <div className={styles.translation}>{ayah.translations[0].text}</div>
      <SurahInfo surahNumber={ayah.verse_key} />
    </div>
  )
}
