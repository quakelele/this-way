import { useState } from 'react'
import styles from './QuranReader.module.scss'
import { useGetAyahsQuery } from 'features/QuranReader/api/quranApi'
import { AyahCardQuran } from 'entities'
import { Spin, Select } from 'antd'
import { Pagination } from 'features/Pagination/ui/Pagination/Pagination'
import Favorites from 'features/Favorites/ui/Favorites/Favorites'

const { Option } = Select

const QuranReader: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentView, setCurrentView] = useState<'reader' | 'favorites'>(
    'reader'
  )
  const [chapterId, setChapterId] = useState(1)
  const { data, isLoading, isFetching, error } = useGetAyahsQuery(
    { chapterId, page: currentPage },
    { refetchOnMountOrArgChange: true }
  )

  const handlePageChange = (newPage: number) => {
    if (data && newPage >= 1 && newPage <= data.totalPages) {
      setCurrentPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleChapterChange = (value: number) => {
    setChapterId(value)
    setCurrentPage(1)
  }

  console.log('Data:', data)
  console.log('Error:', error)

  return (
    <>
      {/* <header className={styles.header}></header> */}
      <main className={styles.main}>
        <Select
          className={styles.select}
          defaultValue={1}
          style={{ width: 150 }}
          onChange={handleChapterChange}>
          {Array.from({ length: 114 }, (_, i) => (
            <Option
              key={i + 1}
              value={i + 1}>
              Сура {i + 1}
            </Option>
          ))}
        </Select>
        {currentView === 'reader' && (
          <>
            {(isLoading || isFetching) && (
              <div className={styles.loadingContainer}>
                <Spin className={styles.loadingSpinner} />
                <span className={styles.loadingText}>Загрузка аятов...</span>
              </div>
            )}
            {error && (
              <div className={styles.loadingContainer}>
                <p className={styles.errorText}>
                  Ошибка загрузки: {error.message   || 'Неизвестная ошибка'}
                </p>
              </div>
            )}
            {data && data.ayahs?.length === 0 && (
              <div className={styles.loadingContainer}>
                <p className={styles.errorText}>
                  Аяты для этой суры не найдены
                </p>
              </div>
            )}
            {data?.ayahs?.map(ayah => (
              <AyahCardQuran
                key={ayah.id}
                ayah={ayah}
              />
            ))}
            {data && data.totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={data.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
        {currentView === 'favorites' && <Favorites />}
      </main>
    </>
  )
}

export default QuranReader
