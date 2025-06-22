

import { NavLink } from 'react-router-dom'
import styles from './Navigation.module.scss'
import { ROUTE } from 'shared/lib/constants'
import { FolderHeart, House, Search, Settings } from 'lucide-react'
import { useTranslation } from 'shared/hooks/useTranslation'

export const Navigation = () => {
    const { t } = useTranslation()
  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
      <House size={18} />
        <span>{t('Главная')}</span>
      </NavLink>
      <NavLink to={ROUTE.SEARCH} className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
      <Search size={18} />
        <span>{t('Поиск')}</span>
      </NavLink>
      <NavLink to={ROUTE.BOOKMARK} className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
      <FolderHeart size={18} />
        <span>{t('Избранное')}</span>
      </NavLink>
      <NavLink to={ROUTE.SETTINGS} className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
      <Settings size={18} />
        <span>{t('Настройки')}</span>
      </NavLink>
    </nav>
  )
}
