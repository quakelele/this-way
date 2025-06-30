import { useState } from 'react'
import { useGetSurahListByLanguageQuery } from 'features/SurahList/api/surahListApi'
import { SurahCard } from 'entities/Surah/ui/SurahCard/SurahCard'
import { Select } from 'antd'
import { useTranslation } from 'shared/hooks/useTranslation'

import styles from './SurahList.module.scss'
import { surahOptions } from 'features/QuranReader/constants/surahs'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { RootState } from 'app/store/store'
import { SurahType } from 'features/SurahList/model/types'

export const SurahsList = () => {
  const language = useSelector((state: RootState) => state?.language.lang)
  console.log(language)
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
        <h2 className={styles.title}>{t('Священный Коран')}</h2>

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
            label: `${t('Сура')} ${option.value}: ${t(option.label.russian)} (${
              option.label.arabic
            })`,
          }))}
          popupMatchSelectWidth={false}
        />
      </header>
      <div className={styles.grid}>
        {data?.chapters.map((surah: SurahType) => (
          <SurahCard
            key={surah.id}
            {...surah}
          />
        ))}
      </div>
    </div>
  )
}
