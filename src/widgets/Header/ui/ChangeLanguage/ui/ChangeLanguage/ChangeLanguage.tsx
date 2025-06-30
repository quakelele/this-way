import { setLanguageFromHeader } from 'app/store/slice/languageSlice'
import styles from './ChangeLanguage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'app/store/store'
import { useEffect, useRef, useState } from 'react'
import { Globe } from 'lucide-react'

export const ChangeLanguage = () => {
  const [langOpen, setLangOpen] = useState(false)
  const { localLanguage } = useSelector(
    (state: RootState) => state.language.lang
  )
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', closeOutside)
    return () => document.removeEventListener('mousedown', closeOutside)
  }, [])

  const dispatch = useDispatch()
  const changeLanguage = (lang: 'ru' | 'az') => {
    dispatch(setLanguageFromHeader(lang))
    setLangOpen(false)
  }
  return (
    <div
      className={styles.langWrapper}
      ref={langRef}>
      <button
        className={styles.langToggle}
        onClick={() => setLangOpen(prev => !prev)}
        aria-label="Select language">
        <Globe size={20} />
        <span className={styles.langLabel}>{localLanguage.toUpperCase()}</span>
      </button>
      {langOpen && (
        <ul className={styles.langDropdown}>
          <li onClick={() => changeLanguage('ru')}>Русский</li>
          <li onClick={() => changeLanguage('az')}>Azərbaycan</li>
        </ul>
      )}
    </div>
  )
}
