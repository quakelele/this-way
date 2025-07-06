import React from 'react';
import styles from './MushafLine.module.scss';
import { playAudio } from 'entities/Mushaf/utils/playAudio';
import { MushafWord } from 'entities/Mushaf/model/types';
import { Tooltip } from 'antd';

type Props = {
  words: MushafWord[];
};

export const MushafLine: React.FC<Props> = ({ words }) => {
  return (
    <div className={styles.line}>
      {words.map((word) => {
        const isLast = word.isLastInVerse;

        return (
          <React.Fragment key={word.id}>
            <Tooltip
              title={`${word.translation.text} (${word.transliteration.text || 'Нет транслитерации'})`}
              placement="top"
            >
              <span
                className={styles.word}
                onClick={() => playAudio(word.audio_url)}
                aria-label={word.translation.text}
              >
                {word.text_uthmani}
              </span>
            </Tooltip>
            {isLast && (
              <span className={styles.verseNumber}>{`﴿${word.verse_number.toLocaleString('ar-EG')}﴾`}</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};