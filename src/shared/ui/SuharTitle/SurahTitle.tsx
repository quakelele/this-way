import leftArrow from 'assets/img/leftArrow.png'
import rightArrow from 'assets/img/rightArrow.png'
import styles from './SurahTitle.module.scss'
import { useTranslation } from 'shared/hooks/useTranslation'
type Props = {
  surah_tr: string
  verse_id: number
}

export const SurahTitle = ({ surah_tr, verse_id }: Props) => {
  const { t } = useTranslation()
  return (
    <div className={styles.wrapper}>
      {/* <img
        width={66}
        src={leftArrow}
        alt=""
      /> */}
      <div className={styles.title}>
        <h2 className={styles.translated}>
          {verse_id}. {t('Сура')} {surah_tr}
        </h2>
        {/* <h2 className={styles.arabic}>{surah_ar}</h2> */}
      </div>
      {/* <img
        width={66}
        src={rightArrow}
        alt=""
      /> */}
    </div>
  )
}
