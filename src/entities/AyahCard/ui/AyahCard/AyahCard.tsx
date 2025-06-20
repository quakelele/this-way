
import { Card } from 'antd';

import styles from './AyahCard.module.scss';
import { DecorationSvg as Decoration } from 'shared/ui/DecorationSvg/DecorationSvg';
import { BookOpen } from 'lucide-react';

import { AyahItem } from 'entities';

import { surahs } from 'entities/AyahCard/model/surahs';
import { Translation } from 'entities/AyahCard/model/types';


type Props = {
  verse_key: string
  text: string
  translations: Translation[]
  search: string
}


export const AyahCard = (
  { verse_key, text, translations, search }: Props
) => {

  //   const [favorites, setFavorites] = useState<Verse[]>([])
  // console.log(surah.length)
  //   const toggle = (verse) => {
  //     const updated = favorites.find(item => item.name === verse.id)
  //   }

  const surahName = verse_key.split(':')[0] 

  return (
    <Card className={styles.card} hoverable>

      <div className={styles.header}>
        <div className={styles.surahInfo}>
          <div className={styles.surahNumber}>{surahName}</div>
          <div className={styles.ayahInfo}>
            <BookOpen size={15} className={styles.bookIcon} />
            <span>
              {`${surahs[surahName].russian} ${surahs[surahName].arabic}`}
            </span>
          </div>
        </div>

      </div>

      {translations.map((translation) => (
        <AyahItem
          searchQuery={search}
          key={translation.resource_id}
          surahKey={verse_key}
          arabianText={text}
          {...translation}

        />
      ))}
      <Decoration />
    </Card>
  );
};
