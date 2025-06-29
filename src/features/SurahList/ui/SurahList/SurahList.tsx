import React, { useCallback, useMemo, useState } from 'react'
import { useGetSurahListByLanguageQuery } from 'features/SurahList/api/surahListApi'
import { SurahCard } from 'entities/Surah/ui/SurahCard/SurahCard'
import { Select } from 'antd'
import { useTranslation } from 'shared/hooks/useTranslation'
import { options, TranslationOption } from 'features/QuranSearch/utils/options'
import styles from './SurahList.module.scss'
import { surahOptions } from 'features/QuranReader/constants/surahs'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

export const SurahsList = () => {
  const language = useSelector(state => state.language.lang)
  const { t } = useTranslation()
  const { data, isFetching } = useGetSurahListByLanguageQuery(language)
  const [chapterId, setChapterId] = useState(1)

  const handleChapterChange = (value: number) => {
    setChapterId(value)
    navigate(`/${value}`)
  }
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>{t('holy_quran')}</h2>


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
          // `/${id}`
          options={surahOptions.map(option => ({
            value: option.value,
            label: `${t('Сура')} ${option.value}: ${t(option.label.russian)} (${
              option.label.arabic
            })`,
          }))}
          popupMatchSelectWidth={false}
        />
      </header>
      <div className={styles.grid}>
        {isFetching ? (
          <div className={styles.skeleton}>{t('Загрузка')}...</div>
        ) : (
          data?.chapters.map(surah => (
            <SurahCard
              key={surah.id}
              {...surah}
            />
          ))
        )}
      </div>
    </div>
  )
}
