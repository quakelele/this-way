
import { Divider, Tag, Tooltip } from 'antd';
import styles from './AyahItem.module.scss';
import { CopyButton } from 'shared/ui/CopyButton/CopyButton';
import { Heart } from 'lucide-react';



//                 "translations": [
//                   {
//                     "text": "О те, которые уверовали! Не входите в дома \u003Cem\u003EПророка\u003C/em\u003E, если только вас не пригласят на трапезу, но не дожидайтесь ее приготовления (не приходите заранее). Если же вас пригласят, то входите, а когда поедите, то расходитесь и не усаживайтесь для разговоров. Этим вы причиняете неудобство \u003Cem\u003EПророку\u003C/em\u003E. Он стыдится вас, но Аллах не стыдится истины. Если вы просите у них (жен \u003Cem\u003EПророка\u003C/em\u003E) какую-либо утварь, то просите у них через завесу. Так будет чище для ваших сердец и их сердец. Вам не подобает ни обижать Посланника Аллаха, ни жениться на его женах после его смерти. Воистину, это является великим грехом перед Аллахом.",
//                     "resource_id": 45,
//                     "name": "Russian Translation ( Elmir Kuliev )",
//                     "language_name": "russian"
//                   }
//                 ]

type Props = {
  text: string
  // resourse_id: number 
  surahKey: string
  arabianText: string
  searchQuery: string
}

export const AyahItem = (
  { text: russianText, surahKey, arabianText, }: Props
) => {
  // const [, setCurrentHighlight] = useState(-1);
  const arabicAndTranslateCopy = `📖 ${surahKey}  \n\n🕋 ${arabianText}\n\n✎𓂃 ${russianText}`;
  // const arabicAndTranslateCopy = `📖 ${translation} ﴾ ${id}:${verse.id} ﴿\n\n🕋 ${arabianText}\n\n✎𓂃 ${verse.translation}`;


  return (

    <div className={styles.verseContainer}>
      <div className={styles.arabicText}>
        <Tag bordered={false} color="lime">
          {surahKey.split(':')[1]}
        </Tag>
        <p>{arabianText}</p>

      </div>
      <div className={styles.translation}>
        <div
          dangerouslySetInnerHTML={{ __html: russianText }}
          className={styles.translationText}>
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
