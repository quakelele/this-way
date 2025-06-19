
import { Divider, Tag, Tooltip } from 'antd';
import styles from './AyahItem.module.scss';
import { coloredSearchText } from 'entities/AyahCard/model/coloredSearchText';
import { CopyButton } from 'shared/ui/CopyButton/CopyButton';
import { Verse } from 'shared/model/types';
import { useState } from 'react';
import { Heart } from 'lucide-react';



type Props = {
  search: string;
  name: string
  verse: Verse;
  translation: string

  id: number

};

export const AyahItem = ({ translation, verse, id, name, search, }: Props) => {
  const [, setCurrentHighlight] = useState(-1);
  const arabicAndTranslateCopy = `Сура: ${id} - ${translation} (${name}) | Аят: ${verse.id}\n\n🕋 ${verse.text}\n\n📖 ${verse.translation}`;

  // const updatedObject = {
  //   ruName: translation,
  //   arabicName: name,
  //   arabicText: verse.text,
  //   surahNumber: id,
  //   ayahNumber: verse.id,
  //   ruText: verse.translation
  // }
  
 
  return (

    <div className={styles.verseContainer}>

      <div className={styles.arabicText}>
        <Tag bordered={false} color="lime">
          {verse.id}
        </Tag>
        <p>{verse.text}</p>

      </div>
      <div className={styles.translation}>
        <div className={styles.translationText}>
          {coloredSearchText(verse.translation, search, setCurrentHighlight)}
        </div>

      </div>
      <div className={styles.buttonBlock}>


        <button
          // onClick={() => addToFavorites()}
          // className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
        >
          <Tooltip title="Добавить в избранное">
            <Heart size={20} />
          </Tooltip>
        </button>

        <CopyButton text={arabicAndTranslateCopy} />


      </div>

      <Divider />
    </div>
  );
};
