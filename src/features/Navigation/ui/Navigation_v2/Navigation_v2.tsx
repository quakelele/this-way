import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'shared/hooks/useTranslation'
import { ROUTE } from 'shared/lib/constants'
import styles from './Navigation_v2.module.scss'
import headerStyles from 'features/Navigation/styles/Header_v2.module.scss'
import burgerStyles from 'features/Navigation/styles/Burger_v2.module.scss'
import { navItems } from 'features/Navigation/lib/navConfig'
import logo from 'assets/logo-1.png'
import { useVisibleInScroll } from 'shared/hooks/useVisibleInScroll'
export const Navigation_v2 = () => {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isVisible = useVisibleInScroll()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <>
      <header
        className={`${headerStyles.header} ${
          isVisible ? headerStyles.visible : headerStyles.hidden
        }`}>
        <div className={headerStyles.container}>
          <Link
            to={ROUTE.HOME}
            style={{color:'gray'}}
            className={headerStyles.logo}>
           QuranApp
          </Link>
          <nav className={`${styles.navbar} ${isMenuOpen ? styles.open : ''}`}>
            {navItems.map(({ path, icon, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
                onClick={() => setIsMenuOpen(false)}
                aria-label={t(label)}>
                {icon}
                <span className={styles.label}>{t(label)}</span>
              </NavLink>
            ))}
          </nav>
          <button
            className={burgerStyles.burger}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      {isMenuOpen && (
        <div
          className={burgerStyles.overlay}
          onClick={toggleMenu}
        />
      )}
    </>
  )
}
