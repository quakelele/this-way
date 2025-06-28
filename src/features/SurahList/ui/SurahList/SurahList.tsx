import React, { useState } from 'react'
import { useGetSurahListByLanguageQuery } from 'features/SurahList/api/surahListApi'
import { SurahCard } from 'entities/Surah/ui/SurahCard/SurahCard'
import { Select } from 'antd'
import { useTranslation } from 'shared/hooks/useTranslation'
import { options, TranslationOption } from 'features/QuranSearch/utils/options'
import styles from './SurahList.module.scss'

export const SurahsList = () => {
  const [language, setLanguage] = useState(
    JSON.parse(localStorage.getItem('language') || '').localLanguage
  )
  const { t } = useTranslation()
  const { data, isFetching } = useGetSurahListByLanguageQuery(language)

  const handleLanguageChange = (value: TranslationOption) => {
    const selected = options.find(opt => opt.value === value)
    if (selected) setLanguage(selected.selectedLanguage)
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>{t('holy_quran')}</h2>
        <Select
          defaultValue={JSON.parse(localStorage.getItem('language') || '').selectedLanguage}
          onChange={handleLanguageChange}
          options={options}
          className={styles.select}
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
