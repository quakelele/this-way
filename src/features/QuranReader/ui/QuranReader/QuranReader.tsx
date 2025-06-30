import { useState } from 'react'
import styles from './QuranReader.module.scss'
import { AyahCardQuran } from 'entities'
import { Spin, Select, Form, Input, Switch } from 'antd'
import { surahOptions } from 'features/QuranReader/constants/surahs'
import { useGetAyaInfiniteQuery } from 'features/QuranReader/api/quranApi'
import { reciters } from 'features/QuranReader/constants/reciters'
import { useTranslation } from 'shared/hooks/useTranslation'
import { useNavigate, useParams } from 'react-router'
import { surahs } from 'entities/AyahCard/model/surahs'
import { SurahTitle } from 'shared/ui/SuharTitle/SurahTitle'
import { useVisibleInScroll } from 'shared/hooks/useVisibleInScroll'
import { useIntersectionObserver } from 'features/QuranReader/hooks/useIntersectionObserver'
import { TranslationOption } from 'features/QuranSearch/utils/options'
import { setLanguage } from 'app/store/slice/languageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { optionsQuranReader } from 'features/QuranReader/lib/optionsQuranReader'
import { RootState } from 'app/store/store'

export const QuranReader = () => {
  const { t } = useTranslation()
  const { id = '1' } = useParams()
  const [chapterId, setChapterId] = useState(1)
  const [reciter, setReciter] = useState('ar.alafasy')
  const language = useSelector((state: RootState) => state.language.lang)
  const isVisible = useVisibleInScroll()
  const { data, isFetching, isLoading, fetchNextPage, hasNextPage } =
    useGetAyaInfiniteQuery({ id, language })

  const observerRef = useIntersectionObserver({
    isFetching,
    hasNextPage,
    fetchNextPage,
  })

  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChapterChange = (value: number) => {
    setChapterId(value)
    navigate(`/${value}`)
  }

  const onFinish = (values: {
    selectedLanguage: string
    localLanguage: string
    translationLanguage: number
  }) => {
    localStorage.setItem('language', JSON.stringify(values))
    dispatch(setLanguage(values))
  }

  return (
    <main className={styles.main}>
      <section
        className={`${styles.controls} ${
          isVisible ? styles.visible : styles.hidden
        }`}>
        <div className={styles.selectWrapper}>
          <header className={styles.header}>
            <SurahTitle
              surah_tr={t(surahs[id].russian)}
              verse_id={id}
            />
          </header>
          <div className={styles.formInner}>
            <Form
              onFinish={onFinish}
              form={form}
              layout="vertical"
              className={styles.form}>
              <Form.Item
                name="selectedLanguage"
                hidden>
                <Input type="hidden" />
              </Form.Item>
              <Form.Item
                name="localLanguage"
                hidden>
                <Input type="hidden" />
              </Form.Item>

              <Form.Item name="translationLanguage">
                <Select
                  placeholder={t('Выберите перевод')}
                  value={form.getFieldValue('localLanguage')}
                  className={styles.select}
                  options={optionsQuranReader}
                  onChange={(_, option) => {
                    const selected = option as TranslationOption
                    form.setFieldsValue({
                      localLanguage: selected.localLanguage,
                      translationLanguage: selected.value,
                      selectedLanguage: selected.label,
                    })
                    form.submit()
                  }}
                />
              </Form.Item>
            </Form>

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
                label: `${t(option.label)}`,
              }))}
              placeholder="Чтец"
            />
     
          </div>
        </div>
      </section>

      <section className={styles.content}>
        {data?.pages.map(page =>
          page.verses.map(ayah => (
            <AyahCardQuran
              reciter={reciter}
              key={ayah.id}
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
    </main>
  )
}

// const handleLanguageChange = (value: TranslationOption) => {
//   const selected = options.find(opt => opt.value === (value as any))
//   if (selected) setLanguage(selected.selectedLanguage)
// }
//
//
//
// {/*
//  <Select
//   defaultValue={
//     JSON.parse(localStorage.getItem('language') || '').selectedLanguage
//   }
//   onChange={handleLanguageChange}
//   options={options}
//   className={styles.select}
// /> */}
