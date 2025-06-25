import { BookOutlined } from '@ant-design/icons'
import styles from './SurahInfo.module.scss'
import { surahs } from 'entities/AyahCard/model/surahs'

interface Props {
  surahNumber: string
}

export const SurahInfo = ({ surahNumber }: Props) => {

  const surahName = surahNumber.split(':')[0]

  return (
    <div className={styles.surahInfo}>
      <BookOutlined />
      Сура: {`${surahs[surahName].russian} (${surahs[surahName].arabic})`}
    </div>
  )
}
