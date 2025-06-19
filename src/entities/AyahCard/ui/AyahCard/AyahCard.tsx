
import { Card } from 'antd';

import styles from './AyahCard.module.scss';
import { DecorationSvg as Decoration } from 'shared/ui/DecorationSvg/DecorationSvg';
import { BookOpen } from 'lucide-react';
import { Surah, Verse } from 'shared/model/types';
import { AyahItem } from 'entities';





type Props = {
  search: string;
  surah: Surah;
  verses: Verse[];
};
export const AyahCard = ({ verses, surah, search }: Props) => {

  return (
    <Card className={styles.card} hoverable>

      <div className={styles.header}>
        <div className={styles.surahInfo}>
          <div className={styles.surahNumber}>{surah.id}</div>
          <div className={styles.ayahInfo}>
            <BookOpen size={15} className={styles.bookIcon} />
            <span>
              {surah.transliteration} ({surah.translation}) {surah.name}
            </span>
          </div>
        </div>

      </div>

      {verses.map((verse, index) => (
        <AyahItem
      
          key={index}
          verse={verse}
          search={search}
          {...surah}
        />
      ))}
      <Decoration />
    </Card>
  );
};
