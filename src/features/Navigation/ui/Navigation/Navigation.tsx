
import { HomeOutlined,  SettingOutlined, SearchOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import styles from './Navigation.module.scss'
import { ROUTE } from 'shared/lib/constants'

export const Navigation = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink to={ROUTE.HOME} className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
        <HomeOutlined />
        <span>Главная</span>
      </NavLink>
      <NavLink to={ROUTE.SEARCH} className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
        <SearchOutlined />
        <span>Коран</span>
      </NavLink>
      <NavLink to={ROUTE.SETTINGS} className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
        <SettingOutlined />
        <span>Настройки</span>
      </NavLink>
    </nav>
  )
}
