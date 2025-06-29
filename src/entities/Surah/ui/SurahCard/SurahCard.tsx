import { MapPin } from 'lucide-react'
import { AudioButton } from 'shared'
import { useTranslation } from 'shared/hooks/useTranslation'
import styles from './SurahCard.module.scss'
import { Link, useNavigate } from 'react-router'

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
  const navigate = useNavigate()

  const getTypeColor = (type: string) => {
    return type === 'makkah' ? styles.meccan : styles.medinan
  }

  return (
    <div
      className={styles.card}
      style={{ animationDelay: `${id * 0.02}s` }}>
      <div
        onClick={() => navigate(`/${id}`)}
        className={styles.number}>
        {id}
      </div>

      <div
        onClick={() => navigate(`/${id}`)}
        className={styles.content}>
        <div className={styles.name}> {translated_name.name}</div>
        <div className={`${styles.typeTag} ${getTypeColor(revelation_place)}`}>
          <MapPin size={14} />
          {revelation_place === 'makkah' ? t('Мекканская') : t('Мединская')}
        </div>
      </div>

      <div
        onClick={() => navigate(`/${id}`)}
        className={styles.right}>
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
