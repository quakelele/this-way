

import { NavLink } from 'react-router-dom'
import styles from './Navigation.module.scss'
import { ROUTE } from 'shared/lib/constants'
import { FolderHeart, House, Search, Settings } from 'lucide-react'

export const Navigation = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
      <House size={18} />
        <span>Главная</span>
      </NavLink>
      <NavLink to={ROUTE.SEARCH} className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
      <Search size={18} />
        <span>Поиск</span>
      </NavLink>
      {/* <NavLink to={ROUTE.BOOKMARK} className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
      <FolderHeart size={18} />
        <span>Избранное</span>
      </NavLink> */}
      <NavLink to={ROUTE.SETTINGS} className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
      <Settings size={18} />
        <span>Настройки</span>
      </NavLink>
    </nav>
  )
}
