import styles from './HomePage.module.scss'
import kaaba from 'assets/kaaba.jpg'
import { DividerSvg as Divider } from 'shared/ui/DividerSvg/DividerSvg'
import {
  CustomWidget,
  //  CustomWidget,
  RandomAyah,
} from 'widgets'
import { useTranslation } from 'shared/hooks/useTranslation'

export const HomePage = () => {
  const { t } = useTranslation()
  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h2>{t('Спокойствие души через Слова Аллаха')}.</h2>
          <p>
            {t(
              'Слушайте чтение Корана от известных чтецов, узнавайте времена молитв и наполняйте день благом. Всё — в одном месте'
            )}
            .
          </p>
        </div>

        <div className={styles.heroImage}>
          <img
            src={kaaba}
            alt="Islamic mosque"
            className={styles.heroImg}
          />
        </div>
      </div>
      <div className={styles.content}>
        <Divider />

        <CustomWidget />

        <RandomAyah />
        <Divider />
      </div>
    </div>
  )
}
