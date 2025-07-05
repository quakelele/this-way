import { Card, Space } from 'antd'
import styles from './CustomWidget.module.scss'
import { useNavigate } from 'react-router'
import { ROUTE } from 'shared/lib/constants'
import { useTranslation } from 'shared/hooks/useTranslation'
import { BookOpenCheck, SearchCheck } from 'lucide-react'

export const CustomWidget = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <div
      className={styles.actions}>
      <Card
        className={styles.card}
        hoverable>
        <div
          onClick={() => navigate(ROUTE.SEARCH)}
          className={styles.cardContent}>
          <BookOpenCheck />
          <h3 className={styles.cardTitle}>{t('Поиск')}</h3>
          <p className={styles.cardText}>
            {t('Найдите аяты и получите духовное руководство')}
          </p>
        </div>
      </Card>
      <Card
        className={styles.card}
        hoverable>
        <div
          onClick={() => navigate(ROUTE.READER)}
          className={styles.cardContent}>
          <SearchCheck />
          <h3 className={styles.cardTitle}>{t('Чтение')}</h3>
          <p className={styles.cardText}>{t('Священный Коран')} </p>
        </div>
      </Card>
    </div>
  )
}
