import { Card } from 'antd'

import styles from './AyahCard.module.scss'
import { DecorationSvg as Decoration } from 'shared/ui/DecorationSvg/DecorationSvg'
import { BookOpen } from 'lucide-react'

import { AyahItem } from 'entities'

import { surahs } from 'entities/AyahCard/model/surahs'
import { Translation } from 'shared/model/types'
import { AudioPlayer } from 'shared'
import { useTranslation } from 'shared/hooks/useTranslation'

type Props = {
  verse_key: string
  text: string
  translations: Translation[]
}

export const AyahCard = ({ verse_key, text, translations }: Props) => {
  const { t } = useTranslation()
  const surahName = verse_key.split(':')[0]

  return (
    <Card
      className={styles.card}
      hoverable>
      <div className={styles.header}>
        <div className={styles.surahInfo}>
          <div className={styles.surahNumber}>{surahName}</div>
          <div className={styles.ayahInfo}>
            <BookOpen
              size={15}
              className={styles.bookIcon}
            />
            <span>
              {`${t(surahs[surahName].russian)} ${surahs[surahName].arabic}`}
            </span>
          </div>
        </div>
        <AudioPlayer
          reciter={'ar.alafasy'}
          size={1.8}
          surahKeys={verse_key}
        />
      </div>

      {translations.map(translation => (
        <AyahItem
          key={translation.resource_id}
          surahKey={verse_key}
          arabianText={text}
          {...translation}
        />
      ))}
      <Decoration />
    </Card>
  )
}
//   const [favorites, setFavorites] = useState<Verse[]>([])
//   const toggle = (verse) => {
//     const updated = favorites.find(item => item.name === verse.id)
//   }
