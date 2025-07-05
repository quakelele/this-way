import { useState, useEffect, useCallback } from 'react'
import styles from './QuranReader.module.scss'
import { AyahCardQuran } from 'entities'
import { Spin, Select, Checkbox, Drawer} from 'antd'
import { surahOptions } from 'features/QuranReader/constants/surahs'
import { useGetAyaInfiniteQuery } from 'features/QuranReader/api/quranApi'
import { reciters } from 'features/QuranReader/constants/reciters'
import { useTranslation } from 'shared/hooks/useTranslation'
import { useNavigate, useParams } from 'react-router'
import { surahs } from 'entities/AyahCard/model/surahs'
import { SurahTitle } from 'shared/ui/SuharTitle/SurahTitle'
import { useVisibleInScroll } from 'shared/hooks/useVisibleInScroll'
import { useIntersectionObserver } from 'features/QuranReader/hooks/useIntersectionObserver'
import {
  TranslationOption,
  optionsQuranReader,
} from 'features/QuranReader/lib/optionsQuranReader'
import { setLanguage } from 'app/store/slice/languageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'app/store/store'
import { CheckboxProps } from 'antd/lib'
import { Mushaf } from 'entities/Mushaf/ui/Mushaf/Mushaf'
import { useVisibleInScroll } from 'shared/hooks/useVisibleInScroll'

export const QuranReader = () => {
  const { t } = useTranslation()
  const { id = '1' } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isVisible = useVisibleInScroll()

  // Получаем язык из редакса
  const language = useSelector((state: RootState) => state.language.lang)

  // Локальный стейт для выбранной суры и чтеца
  const [chapterId, setChapterId] = useState<number>(Number(id) || 1)
  const [reciter, setReciter] = useState<string>('ar.alafasy')
  const [isVisibleTransliteration, setIsVisibleTransliteration] = useState(() => {
    const storedLanguage = localStorage.getItem('language');
    return storedLanguage ? JSON.parse(storedLanguage)?.isVisibleTrans ?? false : false;
  });


  const [quranToggle, setQuranToggle] = useState(false)

  // При смене url синхронизируем chapterId
  useEffect(() => {
    setChapterId(Number(id) || 1)
    scrollToTop()
  }, [id])

  // Получаем аяты по текущей суре и языку
  const { data, isFetching, isLoading, fetchNextPage, hasNextPage } =
    useGetAyaInfiniteQuery({ id: chapterId.toString(), language })

    const scrollToTop = useCallback(() => {
      window.scrollTo({
        top: 0,
        behavior: 'instant' , // Плавная прокрутка
      });
    }, []);
    

  // Для бесконечного скролла
  const observerRef = useIntersectionObserver({
    isFetching,
    hasNextPage,
    fetchNextPage,
    quranToggle,
  })

  const onTransliterationVisibleChange: CheckboxProps['onChange'] = e => {
    setIsVisibleTransliteration(e.target.checked)
    // console.log(isVisibleTransliteration)
    const newOption = {
      ...language,
      isVisibleTrans: e.target.checked,
    }
    dispatch(setLanguage(newOption))
    localStorage.setItem('language', JSON.stringify(newOption))
  }
  // Смена перевода — обновляем redux + localStorage
  const onLanguageChange = (value: number, option: TranslationOption) => {
    const newLang = {
      selectedLanguage: option.label,
      localLanguage: option.localLanguage,
      translationLanguage: option.value,
      isTajweedEnabled: language.isTajweedEnabled,
    }
    dispatch(setLanguage(newLang))
    localStorage.setItem('language', JSON.stringify(newLang))
  }

  // Смена таджвида
  const onTajweedChange: CheckboxProps['onChange'] = e => {
    const newLang = { ...language, isTajweedEnabled: e.target.checked }
    dispatch(setLanguage(newLang))
    localStorage.setItem('language', JSON.stringify(newLang))
  }
  const onMushafVisible: CheckboxProps['onChange'] = e => {
    setQuranToggle(e.target.checked)
    console.log(quranToggle)
  }

  // Смена суры (в адресной строке и стейте)
  const handleChapterChange = (value: number) => {
    setChapterId(value)
    navigate(`/${value}`)
  }


  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <main className={styles.main}>
      {/* <section
        className={styles.controls}> */}
      <section
        className={`${styles.controls} ${
          isVisible ? styles.visible : styles.hidden
        }`}>
  
        <div className={styles.selectWrapper}>
          <header className={styles.header}>
            <SurahTitle
              surah_tr={t(surahs[chapterId.toString()]?.russian || '')}
              verse_id={chapterId.toString()}
            />
          </header>

      <Drawer
      placement='bottom'
      
      closable={{ 'aria-label': 'Close Button' }}
      onClose={onClose}
      open={open}
      >
 
      <div className={styles.formInner}>
            <Select
              placeholder={t('Выберите перевод')}
              className={styles.select}
              options={optionsQuranReader}
              value={language.translationLanguage}
              onChange={(val, opt) =>
                onLanguageChange(val as number, opt as TranslationOption)
              }
              showSearch
              optionFilterProp="label"
              filterOption={(input, option) =>
                (option?.label as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />

            <Select
              className={styles.select}
              value={chapterId}
              onChange={handleChapterChange}
              showSearch
              optionFilterProp="label"
              filterOption={(input, option) =>
                (option?.label as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={surahOptions.map(option => ({
                value: option.value,
                label: `${t('Сура')} ${option.value}: ${t(
                  option.label.russian
                )} (${option.label.arabic})`,
              }))}
              popupMatchSelectWidth={false}
            />

            <Select
              className={styles.select}
              value={reciter}
              onChange={setReciter}
              options={reciters.map(option => ({
                value: option.value,
                label: t(option.label),
              }))}
              placeholder={t('Чтец')}
            />
            <div className={styles.checkboxes}>
              <Checkbox
                className={styles.checkBox}
                checked={language.isTajweedEnabled}
                onChange={onTajweedChange}>
                {t('Таджвид')}
              </Checkbox>
              <Checkbox
                className={styles.checkBox}
                checked={isVisibleTransliteration}
                onChange={onTransliterationVisibleChange}>
                {t('Переводы')}
              </Checkbox>
              <Checkbox
                className={styles.checkBox}
                checked={quranToggle}
                onChange={onMushafVisible}>
                {t('Мусхаф')}
              </Checkbox>
            </div>
          </div>
      </Drawer>
        </div>
      </section>

      {quranToggle ? (
        // <Mushaf chapterId={chapterId} />
        ''
      ) : (
        <section className={styles.content}>
          {data?.pages.map(page =>
            page.verses.map(ayah => (
              <AyahCardQuran
              showDrawer={showDrawer}
                isVisible={isVisibleTransliteration}
                key={ayah.id}
                reciter={reciter}
                {...ayah}
              />
            ))
          )}

          {isLoading && (
            <div className={styles.status}>
              <Spin />
              <p className={styles.loadingText}>{t('Загрузка аятов')}...</p>
            </div>
          )}

          <div
            ref={observerRef}
            style={{ height: 1 }}
          />

          {isFetching && !isLoading && (
            <div className={styles.status}>
              <Spin />
              <p className={styles.loadingText}>{t('Загрузка')}...</p>
            </div>
          )}

          {!hasNextPage && !isLoading && !isFetching && (
            <div className={styles.status}>
              <p className={styles.loadingText}>{t('Все аяты прочитаны')}</p>
            </div>
          )}
        </section>
      )}
    </main>
  )
}
