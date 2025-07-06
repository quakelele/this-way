import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { setLanguage } from 'app/store/slice/languageSlice'
import { useVisibleInScroll } from 'shared/hooks/useVisibleInScroll'
import styles from './QuranReader.module.scss'
import { ReaderControls } from '../ReaderControls/ReaderControls'
import { ReaderContent } from '../ReaderContent/ReaderContent'
import { TranslationOption } from 'features/QuranReader/lib/optionsQuranReader'
import { useToggle } from 'shared/hooks/useToggle'
import { RootState } from 'app/store/store'
// import { HintBubble } from 'shared/ui/HintBubble/HintBubble'


export const QuranReader = () => {
  const { id = '1' } = useParams()

  const [chapterId, setChapterId] = useState<number>(Number(id) || 1)
  const [reciter, setReciter] = useState<string>('ar.alafasy')

  const quranToggle = useToggle()
  const drawerToggler = useToggle()

  const [isVisibleTransliteration, setIsVisibleTransliteration] = useState(
    () => {
      const storedLanguage = localStorage.getItem('language')
      return storedLanguage
        ? JSON.parse(storedLanguage)?.isVisibleTrans ?? false
        : false
    }
  )

  const isVisible = useVisibleInScroll()
  const language = useSelector((state: RootState) => state.language.lang)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    setChapterId(Number(id) || 1)
    scrollToTop()
  }, [id])

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  }, [])

  const handleChapterChange = (value: number) => {
    setChapterId(value)
    navigate(`/${value}`)
  }

  const handleLanguageChange = (value: number, option: TranslationOption) => {
    const newLang = {
      selectedLanguage: option.label,
      localLanguage: option.localLanguage,
      translationLanguage: option.value,
      isTajweedEnabled: language.isTajweedEnabled,
    }
    dispatch(setLanguage(newLang))
    localStorage.setItem('language', JSON.stringify(newLang))
  }

  const handleTajweedChange = (checked: boolean) => {
    const newLang = { ...language, isTajweedEnabled: checked }
    dispatch(setLanguage(newLang))
    localStorage.setItem('language', JSON.stringify(newLang))
  }

  const handleTransliterationChange = (checked: boolean) => {
    setIsVisibleTransliteration(checked)
    const newOption = { ...language, isVisibleTrans: checked }
    dispatch(setLanguage(newOption))
    localStorage.setItem('language', JSON.stringify(newOption))
  }

  const handleMushafToggle = (checked: boolean) => {
    quranToggle.setValue(checked)
  }
  return (
    <main className={styles.main}>
      
      {/* <ToastHelper
        text="ℹ️ Двойной клик — переключить режим"
        position="top-right"
        storageKey="modeHint"
      /> */}



      <ReaderControls
        chapterId={chapterId}
        reciter={reciter}
        isVisible={isVisible}
        drawerToggler={drawerToggler}
        language={language}
        isVisibleTransliteration={isVisibleTransliteration}
        quranToggle={quranToggle}
        onChapterChange={handleChapterChange}
        onReciterChange={setReciter}
        onLanguageChange={handleLanguageChange}
        onTajweedChange={handleTajweedChange}
        onTransliterationChange={handleTransliterationChange}
        onMushafToggle={handleMushafToggle}
      />
      <ReaderContent
        drawerToggler={drawerToggler}
        chapterId={chapterId}
        reciter={reciter}
        isVisibleTransliteration={isVisibleTransliteration}
        quranToggle={quranToggle}
        language={language}
      />
    </main>
  )
}
