
import { Divider, Tag } from 'antd';
import styles from './AyahItem.module.scss';
import { coloredSearchText } from 'entities/AyahCard/model/coloredSearchText';
import { CopyButton } from 'shared/ui/CopyButton/CopyButton';
import { Verse } from 'shared/model/types';
import { useState } from 'react';



type Props = {
  search: string;
 name: string 
 verse: Verse;
  translation: string 

  id: number 

};
export const AyahItem = ({ translation,verse, id, name, search, }: Props) => {
  const [, setCurrentHighlight] = useState(-1);
  const arabicAndTranslateCopy = `Сура: ${translation} (${name}) | Аят: ${id}\n\n🕋 ${verse.text}\n\n📖 ${verse.translation}`;

  return (
    
    <div className={styles.verseContainer}>

      <div className={styles.arabicText}>
        <Tag bordered={false} color="lime">
          {id}
        </Tag>
        <p>{verse.text}</p>
      </div>
      <div className={styles.translation}>
        <div className={styles.translationText}>
          {coloredSearchText(verse.translation, search, setCurrentHighlight)}
        </div>
        <CopyButton text={arabicAndTranslateCopy} />
      </div>
      <Divider />
    </div>
  );
};
