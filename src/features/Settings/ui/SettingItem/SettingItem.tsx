import { Card } from 'antd';
import styles from './SettingItem.module.scss'
import { JSX } from 'react';

type Props = {
  icon: JSX.ElementType
  title: string,
  description:  JSX.Element,
  children: JSX.Element
  location?: { city: string }
}

export const SettingItem = ({ icon: Icon, title, description, children }: Props) => {
 
  return  (

  <Card className={styles.settingCard}>
    <div className={styles.settingContent}>
      <div className={styles.settingInfo}>
        <div className={styles.iconWrapper}>
          <Icon className={styles.icon} />
        </div>
        <div>
          <h3 className={styles.settingTitle}>{title}</h3>
          {description && <p className={styles.settingDescription}>{description}</p>}
        </div>
      </div>
      <div>{children}</div>
    </div>
  </Card>
)}