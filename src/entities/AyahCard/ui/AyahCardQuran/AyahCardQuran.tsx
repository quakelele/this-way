import { Ayah } from 'features/QuranReader/model/types';
import styles from './AyahCardQuran.module.scss';
import { SurahInfo } from 'entities/Surah/ui/SurahInfo/SurahInfo';
import FavoriteButton from 'features/Favorites/ui/FavoriteButton/FavoriteButton';
import AudioPlayer from 'features/AudioPlayer/ui/AudioPlayer/AudioPlayer';

interface Props {
  ayah: Ayah;
}

export const AyahCardQuran: React.FC<Props> = ({ ayah }) => {
  const verseKey = `${ayah.surahNumber}:${ayah.number}`; // Формируем verse_key

  return (
    <div className={styles.ayahCard}>
      <div className={styles.ayahHeader}>
        <div className={styles.ayahNumber}>
          {ayah.surahName} - Аят {ayah.number}
        </div>
        <div className={styles.ayahActions}>
          <AudioPlayer ayah={ayah} />
          {/* <FavoriteButton ayahId={verseKey} /> */}
        </div>
      </div>
      <div className={styles.arabicText}>{ayah.arabicText}</div>
      <div className={styles.transliteration}>{ayah.transliteration}</div>
      <div className={styles.translation}>{ayah.translation}</div>
      <SurahInfo surahNumber={ayah.surahNumber} surahName={ayah.surahName} />
    </div>
  );
};