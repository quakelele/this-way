/* Header_V2.tsx */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import classNames from 'classnames'
import styles from './Header.module.scss'
import { navItems } from 'features/Navigation/lib/navConfig'
import headerStyles from 'features/Navigation/styles/Header_v2.module.scss'
import { useTranslation } from 'shared/hooks/useTranslation'
import { useLocation, useNavigate } from 'react-router'
import { ROUTE } from 'shared/lib/constants'
import { ChangeLanguage } from '../../../../features/ChangeLanguage/ui/ChangeLanguage'
import { useVisibleInScroll } from 'shared/hooks/useVisibleInScroll'

export const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const isVisible = useVisibleInScroll()
  const { t } = useTranslation()

  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  useEffect(() => {
    setDrawerOpen(false)
  }, [location.pathname])

  return (
    <div
      className={`${headerStyles.header} ${
        isVisible ? headerStyles.visible : headerStyles.hidden
      }`}
      >
      <header className={styles.header}>
        <div className={styles.leftSection}>
          <button
            className={styles.burger}
            onClick={() => setDrawerOpen(true)}
            aria-label="Toggle menu">
            <Menu size={24} />
          </button>
          <a
            href={ROUTE.HOME}
            className={styles.logo}>
           QuranApp
          </a>
        </div>
        <div className={styles.rightSection}>
          {/* <Settings
            size={22}
            onClick={() => navigate(ROUTE.SETTINGS)}
          /> */}

          <ChangeLanguage />
        </div>
      </header>

      <div
        className={classNames(styles.backdrop, {
          [styles.visible]: drawerOpen,
        })}
        onClick={() => setDrawerOpen(false)}
      />

      <nav className={classNames(styles.drawer, { [styles.open]: drawerOpen })}>
        <div className={styles.drawerBackground} />
        <div className={styles.drawerContent}>
          <div className={styles.ayahWidget}>
            <p className={styles.ayahText}>
              ٱلْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
            </p>
            <span className={styles.ayahRef}>(1:1)</span>
          </div>
          <ul className={styles.navList}>
            {navItems.map(item => (
              <li
                onClick={() => navigate(item.path)}
                key={item.path}
                className={styles.navItem}>
                <Link
                  to={item.path}
                  className={styles.navLink}>
                  <span className={styles.icon}>{item.icon}</span>
                  <span className={styles.label}>{t(item.label)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}
