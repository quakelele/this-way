import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'shared/hooks/useTranslation'
import { ROUTE } from 'shared/lib/constants'
import styles from './Navigation_v2.module.scss'
import headerStyles from 'features/Navigation/styles/Header_v2.module.scss'
import burgerStyles from 'features/Navigation/styles/Burger_v2.module.scss'
import { navItems } from 'features/Navigation/lib/navConfig'

export const Navigation_v2 = () => {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false)
      } else {
        setIsHeaderVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      <header
        className={`${headerStyles.header} ${
          isHeaderVisible ? headerStyles.visible : headerStyles.hidden
        }`}>
        <div className={headerStyles.container}>
          <Link
            to={ROUTE.HOME}
            className={headerStyles.logo}>
            Quran App
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
