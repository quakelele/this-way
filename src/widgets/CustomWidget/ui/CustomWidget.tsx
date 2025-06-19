import { Card, Space } from 'antd'
import styles from './CustomWidget.module.scss'
import { WrapperSvg as IconWrapper } from 'shared/ui/WrapperSvg/WrapperSvg'

export const CustomWidget = () => {
  return (
    <Space
    direction="horizontal"
    size={16}
    className={styles.actions}>
    <Card
      className={styles.card}
      hoverable>
      <div className={styles.cardContent}>
        <IconWrapper />
        <h3 className={styles.cardTitle}>Поиск в Коране</h3>
        <p className={styles.cardText}>Найти аяты и суры</p>
      </div>
    </Card>
    <Card
      className={styles.card}
      hoverable>
      <div className={styles.cardContent}>
        <IconWrapper />
        <h3 className={styles.cardTitle}>Настройки</h3>
        <p className={styles.cardText}>Персонализация</p>
      </div>
    </Card>
  </Space>
  )
}
