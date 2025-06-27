import { BookOutlined } from '@ant-design/icons'
import styles from './SurahInfo.module.scss'
import { surahs } from 'entities/AyahCard/model/surahs'
import { useTranslation } from 'shared/hooks/useTranslation'

interface Props {
  surahNumber: string
}

export const SurahInfo = ({ surahNumber }: Props) => {

  const surahName = surahNumber.split(':')[0]
    const { t } = useTranslation()
  return (
    <div className={styles.surahInfo}>
      <BookOutlined />
      {t('Сура')}: {`${t(surahs[surahName].russian)} (${surahs[surahName].arabic})`}
    </div>
  )
}
