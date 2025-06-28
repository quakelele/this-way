import { MapPin } from 'lucide-react'
import { AudioButton } from 'shared'
import { useTranslation } from 'shared/hooks/useTranslation'
import styles from './SurahCard.module.scss'
import { Link } from 'react-router'

type Props = {
  revelation_place: string
  name_arabic: string
  translated_name: { name: string }
  verses_count: number
  name_complex: string
  id: number
}

export const SurahCard = ({
  revelation_place,
  name_arabic,
  translated_name,
  verses_count,
  // name_complex,
  id,
}: Props) => {
  const { t } = useTranslation()

  const getTypeColor = (type: string) => {
    return type === 'makkah' ? styles.meccan : styles.medinan
  }

  return (
    <div
      className={styles.card}
      style={{ animationDelay: `${id * 0.02}s` }}>
      <div className={styles.number}>{id}</div>

      <div className={styles.content}>
        <Link to={`/${id}`}><div className={styles.name}> {translated_name.name}</div></Link>
        <div className={`${styles.typeTag} ${getTypeColor(revelation_place)}`}>
          <MapPin size={14} />
          {revelation_place === 'makkah' ? t('Мекканская') : t('Мединская')}
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.arabic}>{name_arabic}</div>
        <div className={styles.verses}>{verses_count} ayə</div>
      </div>

      <AudioButton
        size={2}
        type="play"
      />
    </div>
  )
}
