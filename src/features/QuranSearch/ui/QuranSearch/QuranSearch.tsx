import { useState } from 'react'

import styles from './QuranSearch.module.scss'
import { QuranSearchForm } from '../QuranSearchForm/QuranSearchForm'
import { SearchFormTypes } from 'shared/model/types'
import { useGetAyaQuery } from 'features/QuranSearch/api/searchApi'
import { AyahCard } from 'entities/AyahCard/ui/AyahCard/AyahCard'
import { AyahCardSkeleton } from 'shared/ui/Skeletons/AyahCardSkeleton/AyahCardSkeleton'
import { NavigationButtons } from 'features/NavigationButtons/NavigationButtons'

export const QuranSearch = () => {
  const [query, setQuery] = useState<SearchFormTypes | undefined>(undefined)
  const { data: searchData, isFetching, } = useGetAyaQuery(query as SearchFormTypes, {
    skip: !query,
  })
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 >Поиск в Коране</h1>
          <p >
            Найдите аяты и получите духовное руководство
          </p>
        </div>

        <QuranSearchForm

          setQuery={setQuery}
          isLoading={isFetching}
        />
        <NavigationButtons search={searchData?.query || ''} />

        {searchData && (
          <div className={styles.results}>
            <h2 className={styles.resultsTitle}>
              Результаты поиска ({searchData?.total})
            </h2>
            {isFetching ? <AyahCardSkeleton /> : (searchData?.results.map((quran, index) => (
              <AyahCard
                search={searchData?.query}
                key={index}
                {...quran}
              />
            )))}
            {!searchData?.results?.length && !isFetching && (
              <div className={styles.emptyState}>
                
                <h3 className={styles.emptyTitle}>Начните поиск</h3>
                <p className={styles.emptyText}>Введите слово или фразу для поиска в Коране</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// {/* Восстановить при необходимости

